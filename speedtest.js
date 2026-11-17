#!/usr/bin/env node
'use strict';

const http = require('node:http');
const https = require('node:https');
const { performance } = require('node:perf_hooks');

const REQUESTS = 10;
const MAX_REDIRECTS = 5;
const MB = 1e6; // 1 МБ = 1 000 000 байт

function download(url, redirectsLeft = MAX_REDIRECTS) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const started = performance.now();

    const req = client.get(url, { headers: { 'cache-control': 'no-cache' } }, (res) => {
      const { statusCode, headers } = res;

      if (statusCode >= 300 && statusCode < 400 && headers.location) {
        res.resume();
        if (redirectsLeft === 0) return reject(new Error('слишком много редиректов'));
        return resolve(download(new URL(headers.location, url).href, redirectsLeft - 1));
      }
      if (statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${statusCode}`));
      }

      let bytes = 0;
      res.on('data', (chunk) => { bytes += chunk.length; });
      res.on('end', () => resolve({ bytes, ms: performance.now() - started }));
      res.on('error', reject);
    });

    req.on('error', reject);
  });
}

const mb = (bytes) => (bytes / MB).toFixed(3);
const speed = (bytes, ms) => (bytes / MB / (ms / 1000)).toFixed(2);

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error('Использование: node speedtest.js <url>');
    process.exit(1);
  }

  let url;
  try {
    url = new URL(input);
  } catch {
    console.error(`Некорректный URL: ${input}`);
    process.exit(1);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    console.error('Поддерживаются только http и https');
    process.exit(1);
  }

  console.log(`URL: ${url.href}`);
  console.log(`Запросов: ${REQUESTS}\n`);

  let totalBytes = 0;
  let totalMs = 0;

  for (let i = 1; i <= REQUESTS; i++) {
    try {
      const { bytes, ms } = await download(url.href);
      totalBytes += bytes;
      totalMs += ms;
      console.log(
        `#${String(i).padStart(2)}  ${ms.toFixed(0)} мс  ${mb(bytes)} МБ  ${speed(bytes, ms)} МБ/с`
      );
    } catch (err) {
      console.error(`#${i}  ошибка: ${err.message}`);
      process.exit(1);
    }
  }

  console.log('\n--- Итог ---');
  console.log(`Скачано всего:        ${mb(totalBytes)} МБ (${totalBytes} байт)`);
  console.log(`Суммарное время:      ${(totalMs / 1000).toFixed(3)} с`);
  console.log(`Среднее время:        ${(totalMs / REQUESTS).toFixed(0)} мс`);
  console.log(`Скорость скачивания:  ${speed(totalBytes, totalMs)} МБ/с (${(totalBytes * 8 / 1e6 / (totalMs / 1000)).toFixed(2)} Мбит/с)`);
}

main();