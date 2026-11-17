Node v24.21.0

### Usage
```
node speedtest.js <url>
```

### Example

#### Exec
```
node .\speedtest.js "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0tiNkWlH0NuovnIqCrNdwsz5kFa_biFiknPVfJzDWu8h8cf9-d1SPvb56bdYe_gkn6MKV1zEO0_G6laCxJmw8ZDqhGdte9mDHp_mZ-iKS&s=10"
```

#### Output
```
URL: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0tiNkWlH0NuovnIqCrNdwsz5kFa_biFiknPVfJzDWu8h8cf9-d1SPvb56bdYe_gkn6MKV1zEO0_G6laCxJmw8ZDqhGdte9mDHp_mZ-iKS&s=10

Запросов: 10

# 1  247 мс  0.040 МБ  0.16 МБ/с
# 2  210 мс  0.040 МБ  0.19 МБ/с
# 3  191 мс  0.040 МБ  0.21 МБ/с
# 4  97 мс  0.040 МБ  0.42 МБ/с
# 5  96 мс  0.040 МБ  0.42 МБ/с
# 6  95 мс  0.040 МБ  0.43 МБ/с
# 7  199 мс  0.040 МБ  0.20 МБ/с
# 8  189 мс  0.040 МБ  0.21 МБ/с
# 9  99 мс  0.040 МБ  0.41 МБ/с
#10  113 мс  0.040 МБ  0.36 МБ/с

--- Итог ---
Скачано всего:        0.403 МБ (403100 байт)
Суммарное время:      1.535 с
Среднее время:        154 мс
Скорость скачивания:  0.26 МБ/с (2.10 Мбит/с)
```