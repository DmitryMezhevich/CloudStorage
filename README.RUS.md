<h1 align="center">CloudStorage</h1>

<p align="center">
<img src="https://i.postimg.cc/HjGYVdFn/cloud-storage-removebg-preview.png" width="40%"></p>

[![](https://img.shields.io/badge/Switch%20Language-EN-green)](https://github.com/DmitryMezhevich/CloudStorage/blob/main/README.md)

## Описание

CloudStorage - это небольшой pet-проект, написанный на Node.js.
Этот проект позволяет загружать и скачивать файлы с удалённого сервера. Сервер использует для хранения локальный диск.
В данном проекте решается проблема конкурентного доступа к файлам при помощи npm модуля "mutex-async".

## Какие есть возможности?

-   Получение списка файлов с сервера в формате JSON.
-   Загрузка файла(-ов) на сервер при помощи form-data.
-   Скачивание определенного файла с сервера
-   Удаление определенного файла или целой папки с сервера

## Установка

<p style="text-indent: 20px;">
Заметка: для установки требуется node.js v19.9.0 или выше и npm v9.6.3 или выше.
</p>

1. Скачайте или клонируйте репозиторий себе на компьютер

```bash
$ git clone https://github.com/DmitryMezhevich/UploadFiles.git
```

2. Откройте папку с проектом в терминале
3. Установите все внешние npm зависимости

```bash
$ npm install
```

4. Запустите приложение

```bash
$ npm start
```

## Демо-версия

Также приложение CloudStorage было развернуто на удаленном сервере, в качестве pet-project.
Вы можете выполнять запросы к удаленному API по следующему пути:

```url
  url https://cloudstorage-02ii.onrender.com
```

ВАЖНО: Локальное хранилище, удалённого сервера, маленькое, поскольку я использую бесплатное решение для моего pet-project.

### Ограничение:

Максимальный размер загружаемого файла может составлять не более 4 ГБ (если вы планируете загружать большие файлы, я рекомендую установить приложение на локальном компьютере).

## Запросы

Для запросов к API рекомендуется использовать Postman.  
Заметка: если вы хотите использовать демо-версию, то при любых запросах следует заменить "localhost:3000/" на "https://cloudstorage-02ii.onrender.com".

-   Получение списка файлов в формате JSON:

```
GET localhost:3000/files-management/orders
```

Пример ответа от сервера в формате JSON:

```JSON
[
   {
      "orderID": "100",
      "type": "directory",
      "children": [
            {
               "name": "1.png",
               "type": "file"
            }
      ]
   }
]
```

-   Загрузка файла(-ов) на сервер при помощи form-data:

```
POST localhost:3000/files-management/orders/{orderID}
```

Где orderID - идентификационный номер папки, в которой будут храниться файл(-ы).  
В form-data обязательно следует указывать ключ, по которому находится загружаемый файл.  
Пример ответа от сервера в формате JSON:

```JSON
{
    "description": "File(-s) was upload!"
}
```

-   Скачивание определенного файла:

```
GET localhost:3000/files-management/orders/{orderID}/files/{fileID}
```

Где orderID - идентификационный номер папки, в которой находится файл, а fileID - название файла.  
Примечание: список доступных файлов можно получить выполнив запрос получения списка файлов: GET localhost:3000/API/listFiles.  
Ответом будет скачанный файл.

-   Удаление определенного файла или целой папки:

```
DELETE localhost:3000/files-management/orders/{orderID}/files/{fileID}
```

```
DELETE localhost:3000/files-management/orders/{orderID}
```

Где orderID - идентификационный номер папки, в которой находится файл, а fileID - название файла.

Пример ответа от сервера в формате JSON:

```JSON
{
    "descripthin": "File: '1.png' has been remove!"
}
```

## В проекте были использованы модули:

-   express
-   async-mutex
-   formidable
-   path
-   fs
-   fs-extra

## Для вопросов и предложений:

### LinkedIn: [Mezhevich Dmitry](https://www.linkedin.com/in/dmitry-mezhevich-073091225/) 😉
