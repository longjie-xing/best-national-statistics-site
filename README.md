[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/longjie-xing/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/longjie-xing/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Japan in Numbers

A sourced national statistics atlas for Japan. Seven hash-routed pages — Overview, Population, Economy, Labour, Health, Education, Environment — with hand-drawn canvas charts, year pickers, a bar/line chart toggle, region filtering and prefecture search. Every figure names its source and year (Statistics Bureau, MHLW, Cabinet Office, Bank of Japan, Ministry of Finance, METI, IMF, OECD, World Bank). Static files only, no build step, no network requests, no external libraries.

## Run it

```sh
python3 -m http.server 8080 --directory app   # open http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # write out/dossier.json
```

Entered on [make.fun](https://make.fun/c/best-national-statistics-site-20261126-0539)
