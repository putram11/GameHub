Article Endpoints

1. GET /articles
Deskripsi: Mengambil daftar artikel dengan filter dan opsi pengurutan jika tersedia.

URL: /articles
Method: GET
Headers: Tidak diperlukan header khusus untuk request ini.
Query Parameters:
```
search (string, optional): Kata kunci untuk pencarian di judul artikel.
sort (string, optional): Pengurutan artikel, default "DESC" (Descending).
category (string, optional): Nama kategori untuk filter artikel.
page (integer, optional): Halaman untuk paginasi, default 1.
```
Response:

Success (200 - OK)
Body:
```
json
Copy code
[
  {
    "id": "integer",
    "title": "string",
    "content": "string",
    "imgUrl": "string",
    "categoryId": "integer",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

2. POST /articles
Deskripsi: Membuat artikel baru. Diperlukan otorisasi.

URL: /articles
Method: POST
Headers: Authorization: Bearer <token>
Body:
```
json
Copy code
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer"
}
```
Response:

Success (201 - Created)

Body:
```
json
Copy code
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```
Error (400 - Bad Request)

Body:
```
json
Copy code
{
  "message": "Validation error message"
}
```

3. GET /articles/
Deskripsi: Mengambil artikel berdasarkan ID.

URL: /articles/:id
Method: GET
Response:

Success (200 - OK)
```
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```
Error (404 - Not Found)
```
{
  "message": "Article not found"
}
```

4. PUT /articles/
Deskripsi: Memperbarui artikel berdasarkan ID. Diperlukan otorisasi.

URL: /articles/:id
Method: PUT
Headers: Authorization: Bearer <token>
```
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer"
}
```
Response:

Success (200 - OK)
```
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

Error (404 - Not Found)

```
{
  "message": "Article not found"
}
```
Error (403 - Forbidden)
```
{
  "message": "Forbidden access"
}
```

5. PATCH /articles/
/image
Deskripsi: Memperbarui gambar artikel berdasarkan ID. Diperlukan otorisasi dan upload file.

URL: /articles/:id/image
Method: PATCH
Headers:
Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: Form-data dengan field image (file).
Response:

Success (200 - OK)

```
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```
Error (404 - Not Found)

```
{
  "message": "Article not found"
}
```
Error (403 - Forbidden)

```
{
  "message": "Forbidden access"
}
```
6. DELETE /articles/
Deskripsi: Menghapus artikel berdasarkan ID. Diperlukan otorisasi.

URL: /articles/:id
Method: DELETE
Headers: Authorization: Bearer <token>
Response:

Success (200 - OK)

```
{
  "message": "Article successfully deleted"
}
```
Error (404 - Not Found)

```
{
  "message": "Article not found"
}
```
Error (403 - Forbidden)
```
{
  "message": "Forbidden access"
}
```

User Endpoints

1. POST /login
Deskripsi: Melakukan login pengguna.

URL: /login
Method: POST
```
{
  "email": "string",
  "password": "string"
}
```
Response:

Success (200 - OK)

```
{
  "access_token": "string"
}
```
Error (400 - Bad Request)

```
{
  "message": "Invalid email or password"
}
```

2. POST /add-user
Deskripsi: Menambahkan pengguna baru. Diperlukan otorisasi.

URL: /add-user
Method: POST
Headers: Authorization: Bearer <token>
```
{
  "email": "string",
  "password": "string"
}
```
Response:

Success (201 - Created)
```
{
  "id": "integer",
  "email": "string"
}
```
Error (400 - Bad Request)

```
{
  "message": "Validation error message"
}
```
Error (401 - Unauthorized)

```
{
  "message": "Unauthorized access"
}
```

Public Endpoints
1. GET /articles
Deskripsi: Mengambil daftar artikel tanpa perlu otorisasi.

URL: /articles
Method: GET
Query Parameters:
```
search (string, optional): Kata kunci pencarian di judul artikel.
sort (string, optional): Pengurutan artikel, default "DESC" (Descending).
category (string, optional): Nama kategori untuk filter artikel.
page (integer, optional): Halaman untuk paginasi, default 1.
```
Response:
```
Success (200 - OK)
```
```
[
  {
    "id": "integer",
    "title": "string",
    "content": "string",
    "imgUrl": "string",
    "categoryId": "integer",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

2. GET /articles/
Deskripsi: Mengambil artikel berdasarkan ID tanpa perlu otorisasi.

URL: /articles/:id
Method: GET
Headers: Tidak diperlukan header khusus untuk request ini.
Response:
```
Success (200 - OK)
```
```
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```
```
Error (404 - Not Found)
```
```
{
  "message": "Article not found"
}
```
3. GET /categories
Deskripsi: Mengambil daftar kategori tanpa perlu otorisasi.

URL: /categories
Method: GET
Headers: Tidak diperlukan header khusus untuk request ini.
Response:
```
Success (200 - OK)
```
```
[
  {
    "id": "integer",
    "name": "string"
  }
]
```

Category Endpoints
1. POST /add
Deskripsi: Menambahkan kategori baru. Diperlukan otorisasi admin.

URL: /add
Method: POST
Headers: Authorization: Bearer <token>
```
{
  "name": "string"
}
```
Response:
```
Success (201 - Created)
```
```
{
  "id": "integer",
  "name": "string"
}
```
```
Error (400 - Bad Request)
```
```
{
  "message": "Validation error message"
}
```
Error (401 - Unauthorized)

```
{
  "message": "Unauthorized access"
}
```

2. GET /all
Deskripsi: Mengambil daftar semua kategori tanpa perlu otorisasi.

URL: /all
Method: GET
Headers: Tidak diperlukan header khusus untuk request ini.
Response:
```
Success (200 - OK)
```
```
[
  {
    "id": "integer",
    "name": "string"
  }
]
```

3. PUT /
/edit
Deskripsi: Memperbarui kategori berdasarkan ID. Diperlukan otorisasi admin.

URL: /categories/:id/edit
Method: PUT
Headers: Authorization: Bearer <token>
```
{
  "name": "string"
}
```

Response:
```
Success (200 - OK)
```
```
{
  "id": "integer",
  "name": "string"
}
```
```
Error (404 - Not Found)
```
```
{
  "message": "Category not found"
}
```
```
Error (403 - Forbidden)
```
```
{
  "message": "Forbidden access"
}
```

4. DELETE /
/delete
Deskripsi: Menghapus kategori berdasarkan ID. Diperlukan otorisasi admin.

URL: /categories/:id/delete
Method: DELETE
Headers: Authorization: Bearer <token>
Response:
```
Success (200 - OK)
```
```
{
  "message": "Category successfully deleted"
}
```
```
Error (404 - Not Found)
```
 ```
{
  "message": "Category not found"
}
```
```
Error (403 - Forbidden)
```
```
{
  "message": "Forbidden access"
}
```
