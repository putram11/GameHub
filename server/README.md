
---

# API Documentation

### Base URL:
```
https://api.example.com
```

---

## Article Endpoints

### 1. **GET** `/articles`

- **Deskripsi**: Mengambil daftar artikel dengan filter dan opsi pengurutan jika tersedia.
- **Method**: GET
- **Headers**: Tidak diperlukan.
- **Query Parameters**:
  | Parameter   | Tipe     | Deskripsi                                        |
  |-------------|----------|--------------------------------------------------|
  | `search`    | String   | Kata kunci untuk pencarian di judul artikel.      |
  | `sort`      | String   | Urutan artikel. Default "DESC".                  |
  | `category`  | String   | Filter artikel berdasarkan kategori.             |
  | `page`      | Integer  | Nomor halaman untuk paginasi. Default: 1.        |

#### Response:
- **200 OK**
```json
[
  {
    "id": 1,
    "title": "Belajar GraphQL",
    "content": "Konten artikel...",
    "imgUrl": "https://example.com/image.jpg",
    "categoryId": 3,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-02T12:00:00Z"
  }
]
```

---

### 2. **POST** `/articles`

- **Deskripsi**: Membuat artikel baru. Diperlukan otorisasi.
- **Method**: POST
- **Headers**: 
  | Key            | Value                   |
  |----------------|-------------------------|
  | Authorization  | Bearer `<token>`         |

- **Body**:
```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": 1
}
```

#### Response:
- **201 Created**
```json
{
  "id": 1,
  "title": "Belajar GraphQL",
  "content": "Konten artikel...",
  "imgUrl": "https://example.com/image.jpg",
  "categoryId": 3,
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-02T12:00:00Z"
}
```

- **400 Bad Request**
```json
{
  "message": "Validation error message"
}
```

---

### 3. **GET** `/articles/:id`

- **Deskripsi**: Mengambil artikel berdasarkan ID.
- **Method**: GET

#### Response:
- **200 OK**
```json
{
  "id": 1,
  "title": "Belajar GraphQL",
  "content": "Konten artikel...",
  "imgUrl": "https://example.com/image.jpg",
  "categoryId": 3,
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-02T12:00:00Z"
}
```

- **404 Not Found**
```json
{
  "message": "Article not found"
}
```

---

### 4. **PUT** `/articles/:id`

- **Deskripsi**: Memperbarui artikel berdasarkan ID. Diperlukan otorisasi.
- **Method**: PUT
- **Headers**: 
  | Key            | Value                   |
  |----------------|-------------------------|
  | Authorization  | Bearer `<token>`         |

- **Body**:
```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": 1
}
```

#### Response:
- **200 OK**
```json
{
  "id": 1,
  "title": "Belajar GraphQL",
  "content": "Konten artikel...",
  "imgUrl": "https://example.com/image.jpg",
  "categoryId": 3,
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-02T12:00:00Z"
}
```

- **404 Not Found**
```json
{
  "message": "Article not found"
}
```

- **403 Forbidden**
```json
{
  "message": "Forbidden access"
}
```

---

## User Endpoints

### 1. **POST** `/login`

- **Deskripsi**: Melakukan login pengguna.
- **Method**: POST

- **Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response:
- **200 OK**
```json
{
  "access_token": "your-access-token"
}
```

- **400 Bad Request**
```json
{
  "message": "Invalid email or password"
}
```

---

## Public Endpoints

### 1. **GET** `/articles`

- **Deskripsi**: Mengambil daftar artikel tanpa otorisasi.
- **Method**: GET
- **Query Parameters**:
  | Parameter   | Tipe     | Deskripsi                                        |
  |-------------|----------|--------------------------------------------------|
  | `search`    | String   | Kata kunci untuk pencarian di judul artikel.      |
  | `sort`      | String   | Urutan artikel. Default "DESC".                  |
  | `category`  | String   | Filter artikel berdasarkan kategori.             |
  | `page`      | Integer  | Nomor halaman untuk paginasi. Default: 1.        |

#### Response:
- **200 OK**
```json
[
  {
    "id": 1,
    "title": "Belajar GraphQL",
    "content": "Konten artikel...",
    "imgUrl": "https://example.com/image.jpg",
    "categoryId": 3,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-02T12:00:00Z"
  }
]
```

---

## Category Endpoints

### 1. **GET** `/categories`

- **Deskripsi**: Mengambil daftar kategori tanpa otorisasi.
- **Method**: GET

#### Response:
- **200 OK**
```json
[
  {
    "id": 1,
    "name": "Tech"
  },
  {
    "id": 2,
    "name": "Lifestyle"
  }
]
```

---

### 2. **POST** `/add`

- **Deskripsi**: Menambahkan kategori baru. Diperlukan otorisasi admin.
- **Method**: POST
- **Headers**: 
  | Key            | Value                   |
  |----------------|-------------------------|
  | Authorization  | Bearer `<token>`         |

- **Body**:
```json
{
  "name": "string"
}
```

#### Response:
- **201 Created**
```json
{
  "id": 1,
  "name": "Tech"
}
```

- **400 Bad Request**
```json
{
  "message": "Validation error message"
}
```

- **401 Unauthorized**
```json
{
  "message": "Unauthorized access"
}
```

---

