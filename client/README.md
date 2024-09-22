[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15491831&assignment_repo_type=AssignmentRepo)

# P2-Challenge-2 (Client Side)

> Tuliskan API Docs kamu di sini

API Documentation
Routing Overview
Dokumentasi ini menjelaskan konfigurasi rute untuk aplikasi, termasuk berbagai rute dan komponen terkait. Routing dikelola menggunakan React Router.

Routes

1. /

   Component: RootLayout
   Description: Layout utama yang membungkus semua halaman anak.

2. /login

   Component: Login
   Description: Halaman login pengguna.
   Method: GET
   Headers: Tidak diperlukan header khusus.

3. /home

   Component: AllArticle
   Description: Halaman yang menampilkan semua artikel untuk pengguna yang sudah login.
   Method: GET
   Headers:
   Authorization: Bearer <token>
   Deskripsi: Token autentikasi yang diperlukan untuk mengakses rute ini.

4. /register

   Component: Register
   Description: Halaman untuk mendaftar pengguna baru.
   Authorization: Bearer <token>
   Deskripsi: Token autentikasi yang diperlukan untuk mengakses rute ini.

5. /cat

   Component: AllCategories
   Description: Halaman yang menampilkan semua kategori artikel.
   Method: GET
   Headers:
   Authorization: Bearer <token>
   Deskripsi: Token autentikasi yang diperlukan untuk mengakses rute ini.

6. /create

   Component: CreateArticle
   Description: Halaman untuk membuat artikel baru.
   Method: GET
   Headers:
   Authorization: Bearer <token>
   Deskripsi: Token autentikasi yang diperlukan untuk mengakses rute ini.

7. /update/articles/:id

   Component: UpdateArticle
   Description: Halaman untuk memperbarui artikel yang ada.
   Method: GET
   Headers:
   Authorization: Bearer <token>
   Deskripsi: Token autentikasi yang diperlukan untuk mengakses rute ini.
   Path Parameters:
   id (string): ID artikel yang akan diperbarui.

8. /update/photo/:id

   Component: UploadImage
   Description: Halaman untuk mengunggah gambar untuk artikel tertentu.
   Method: GET
   Headers:
   Authorization: Bearer <token>
   Deskripsi: Token autentikasi yang diperlukan untuk mengakses rute ini.
   Path Parameters:
   id (string): ID artikel yang fotonya akan diunggah.

9. /articles/:id

   Component: ArticleDetail
   Description: Halaman yang menampilkan detail artikel berdasarkan ID.
   Method: GET
   Headers:
   Authorization: Bearer <token>
   Deskripsi: Token autentikasi yang diperlukan untuk mengakses rute ini.
   Path Parameters:
   id (string): ID artikel yang akan ditampilkan.
   Protected Routes
   Rute-rute berikut memerlukan autentikasi. Token autentikasi harus disertakan dalam header Authorization dengan format Bearer <token>.

Protected Route Configuration
Component: ProtectedRoute
Description: Komponen yang membungkus rute yang memerlukan autentikasi.
Catatan: Jika isAuthenticated tidak terdefinisi, rute tidak akan dirender hingga status autentikasi dipastikan.
