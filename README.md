## Installation

```bash
$ npm install
```

## Running the database
To work with the database, you need to install docker and docker-compose

Run database:
```bash
# start db
$ npm run dev-db:initdb

# create migrations and seeds
$ npm run dev-db:seeds
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Routes

create booking:
`POST 127.0.0.1:3000/booking`

body:
{

    "carId": 1,
    "startDate": "2021-07-05",
    "endDate": "2021-07-23"

}

create rental session:
`POST 127.0.0.1:3000/rental-sessions`

body:
{

    "carId": 1,
    "bookingId": 17,
    "mileage": 1000,
    "date": "2021-07-05"

}

get rental session report:
`GET 127.0.0.1:3000/rental-sessions`

query params:

`report` values:


    byDate
    
    byCarId
    
    byDateAndCarId
    
    all

`date` string 'YYYY-MM-DD'

`carId` number

## ТЗ
Расчет стоимости аренды автомобилей

Задание

Произвести расчёт стоимости аренды автомобиля за период,

Создание сессии аренды автомобиля

Сформировать отчёт средней загрузки автомобилей по дням, по каждому авто и по всем автомобилям.



Исходные данные
Тарифы:

Первый тариф - 270 ₽ в день за 200 км в день

Второй тариф - 330 ₽ в день за 350 км в день

третий тариф - 390 ₽ в день за 500 км в день
Скидки:

5% при бронировании от 3 до 5 дней

10% при бронировании от 6 до 14 дней

15% при бронировании от 15 до 30 дней

Максимальный срок аренды 30 дней.

Парк автомобилей - 5 автомобилей (марка, модель, госномер, VIN)


Условия:

Пауза между бронированиями должна составлять 3 дня

Начало и конец аренды не может выпадать на выходной день (суббота, воскресенье).


Требование к разработке:

язык: TypeScript

платформа: NodeJs 12+

фреймворк: NestJs

субд: Postgres 9+

без использования ORM библиотек (чистый sql).

Описание процесса запуска в readme.md
