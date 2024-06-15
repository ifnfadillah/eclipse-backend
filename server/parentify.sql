-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jun 2024 pada 15.40
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parentify`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2a$04$BCEaY28/VbYYniehWmZy/Ocz0lj4zcd8r93vrTm5w7pp.KaXE1DP2'),
(2, 'admin2', '12345');

-- --------------------------------------------------------

--
-- Struktur dari tabel `artikel`
--

CREATE TABLE `artikel` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `foto` text NOT NULL,
  `tanggal` date NOT NULL,
  `isi` longtext NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `artikel`
--

INSERT INTO `artikel` (`id`, `judul`, `author`, `foto`, `tanggal`, `isi`, `admin_id`) VALUES
(1, 'Pentingnya Keterlibatan Ayah dalam Pengasuhan Anak', 'Anita Putri', 'article1.jpg', '2024-02-29', ' \"Keterlibatan ayah dalam pengasuhan anak memiliki peran yang tak tergantikan dalam membangun fondasi kehidupan anak yang sehat dan berkualitas. Ayah yang terlibat aktif dalam kehidupan anak membantu menciptakan ikatan emosional yang kokoh antara ayah dan anak. Kehadiran dan keterlibatan ayah dalam kehidupan sehari-hari anak dapat memberikan rasa keamanan dan stabilitas yang penting bagi perkembangan anak. Anak-anak yang memiliki hubungan yang baik dengan ayah cenderung memiliki tingkat kepercayaan diri yang lebih tinggi, yang merupakan modal penting dalam menghadapi berbagai situasi dalam kehidupan.\",\r\n        \"Selain itu, keterlibatan ayah dalam pengasuhan juga berdampak positif pada perkembangan kognitif anak. Ayah sering kali memperkenalkan anak pada pengalaman-pengalaman baru yang menantang secara intelektual. Interaksi ini membantu meningkatkan kemampuan berpikir kritis, kreativitas, serta kemampuan memecahkan masalah anak. Selain itu, peran ayah dalam memperluas wawasan dan kosakata anak juga sangat berarti dalam pembentukan kecerdasan anak.\",\r\n        \"Selanjutnya, keterlibatan ayah dalam pengasuhan juga memberikan dampak positif dalam hal pengembangan keterampilan sosial anak. Ayah memberikan contoh yang baik dalam hal komunikasi dan interaksi sosial, yang dapat menjadi model bagi anak dalam membangun hubungan yang sehat dengan orang lain. Selain itu, ayah juga memberikan pandangan yang berbeda dalam memandang dunia, yang dapat memperkaya pemahaman anak tentang lingkungan sekitarnya.\",\r\n        \"Terakhir, keterlibatan ayah dalam pengasuhan juga berperan dalam memberikan dukungan emosional dan mental bagi anak. Anak yang merasa didukung oleh ayahnya cenderung lebih mampu menghadapi tantangan dan stres dalam kehidupan. Dukungan ayah juga memberikan rasa percaya diri dan harga diri yang kuat pada anak. Oleh karena itu, keterlibatan ayah dalam pengasuhan anak memiliki peran yang sangat penting dalam membentuk individu yang mandiri, tangguh, dan berkualitas.\",', 1),
(7, 'Mengatasi Tantangan Parenting di Era Digital', 'Talitha Prama Nindya', 'article2.jpg', '2024-06-09', '\"Parenting di era digital membawa tantangan baru bagi orangtua dalam mendidik dan mengasuh anak-anak mereka. Salah satu tantangan utama adalah mengelola waktu screen time anak. Dalam era di mana teknologi begitu meresap dalam kehidupan sehari-hari, penting bagi orangtua untuk membatasi waktu anak menggunakan gadget agar tidak berdampak negatif pada perkembangan fisik dan mental mereka.\",\r\n        \"Selain itu, orangtua juga dihadapkan pada tantangan dalam mengawasi konten yang dikonsumsi oleh anak-anak mereka di internet. Dengan begitu banyaknya informasi yang tersedia secara online, orangtua perlu aktif dalam mengawasi dan membimbing anak-anak mereka untuk mengonsumsi konten yang positif dan mendidik. Ini dapat dilakukan dengan membimbing anak dalam memilih konten yang sesuai dengan nilai-nilai dan kebutuhan perkembangan mereka.\",\r\n        \"Tantangan lainnya adalah memahami dan mengelola risiko yang terkait dengan kehadiran online anak-anak. Hal ini meliputi keamanan dan privasi online anak, serta risiko terpapar pada konten yang tidak pantas. Orangtua perlu aktif dalam memberikan pemahaman kepada anak tentang pentingnya keamanan online dan bagaimana cara berperilaku yang aman di dunia maya.\",zz\r\n        \"Dalam menghadapi tantangan parenting di era digital, penting bagi orangtua untuk membangun komunikasi yang baik dengan anak-anak mereka. Dengan berkomunikasi secara terbuka dan jujur, orangtua dapat memahami lebih baik tentang kebutuhan dan kekhawatiran anak-anak mereka terkait penggunaan teknologi. Hal ini juga membantu menciptakan hubungan yang kuat antara orangtua dan anak, sehingga mereka dapat bekerja sama dalam mengatasi tantangan yang ada.\",', 1),
(8, 'Bagaimana Menentukan Usia yang Tepat Untuk Anak Memulai Berpuasa?', 'Mochammad Ifan Fadillah', 'article3.jpg', '2024-06-09', '\"Berpuasa merupakan salah satu kewajiban umat Muslim yang harus dilakukan setelah mencapai usia baligh atau dewasa. Namun, sebelum mengajak anak untuk berpuasa penuh, penting untuk memahamkan mereka tentang arti dan tujuan puasa. Menurut Kementerian Agama Republik Indonesia, puasa adalah menahan diri dari segala sesuatu yang membatalkan puasa mulai dari terbit fajar sampai terbenamnya matahari, disertai dengan niat-niat tertentu. Pengertian ini penting agar anak memahami bahwa puasa bukan hanya menahan makan dan minum, tetapi juga menahan hawa nafsu serta perbuatan dan perkataan tidak baik yang dilarang oleh agama.\",\r\n        \"Usia anak wajib puasa umumnya dimulai saat mereka sudah baligh atau dewasa, yang biasanya terjadi saat anak memasuki usia 10 tahun. Namun, sebagian besar anak sudah mulai diajarkan berpuasa pada usia 7 tahun dengan memperhatikan kondisi fisik dan kemampuan tubuh mereka. Anak-anak usia 7 tahun diperbolehkan untuk berpuasa penuh maupun setengah hari. Salah satu pertimbangan dan tanda bahwa anak sudah siap untuk berpuasa adalah memiliki berat badan yang sesuai dengan usianya. Jika anak dalam kondisi sehat dan berat badannya sesuai dengan usianya, maka tidak masalah untuk mengajari mereka latihan berpuasa.\",\r\n        \"Selain usia, penting untuk memperhatikan kesiapan anak dalam menghadapi puasa. Orang tua perlu memperhatikan kemampuan anak untuk menahan lapar dan haus tanpa membahayakan kesehatannya. Jika anak menunjukkan ketertarikan dan kesiapan untuk berpuasa, orang tua dapat memberikan dukungan dan bimbingan yang diperlukan. Sebelum memutuskan untuk mengajak anak berpuasa, disarankan untuk berkonsultasi dengan ahli agama dan dokter untuk mendapatkan panduan yang lebih spesifik sesuai dengan kondisi anak. Hal ini penting untuk memastikan bahwa anak dapat melaksanakan puasa dengan baik dan aman bagi kesehatannya.\",', 1),
(9, 'Mengembangkan Rasa Percaya Diri Anak', 'Muhammad Fakhri Musyaffa', 'article4.png', '2024-06-09', '\"Mengembangkan rasa percaya diri anak merupakan salah satu hal penting dalam proses pendidikan dan pengasuhan. Orang tua memiliki peran yang besar dalam membantu anak membangun rasa percaya diri yang kuat. Salah satu cara yang efektif adalah dengan memberikan dukungan dan pujian yang positif atas pencapaian dan usaha yang dilakukan oleh anak. Dengan memberikan dorongan positif ini, anak akan merasa dihargai dan termotivasi untuk terus berkembang.\",\r\n        \"Selain itu, penting bagi orang tua untuk memberikan kesempatan kepada anak untuk belajar mandiri dan mengambil keputusan. Memberikan tanggung jawab yang sesuai dengan usia dan kemampuan anak dapat membantu mereka merasa lebih percaya diri dalam menghadapi berbagai situasi. Selain itu, memberikan ruang bagi anak untuk bereksplorasi dan mencoba hal-hal baru juga dapat membantu mereka mengembangkan keterampilan dan percaya diri.\",\r\n        \"Komunikasi yang terbuka antara orang tua dan anak juga merupakan kunci penting dalam mengembangkan rasa percaya diri anak. Mendengarkan dengan penuh perhatian atas apa yang anak sampaikan, serta memberikan masukan yang konstruktif dan positif, dapat membantu anak merasa didukung dan dihargai. Dengan demikian, anak akan merasa lebih percaya diri dalam berinteraksi dengan orang lain dan menghadapi berbagai tantangan dalam kehidupan.\",\r\n        \"Dalam mengembangkan rasa percaya diri anak, konsistensi dan kesabaran juga sangat diperlukan. Proses ini memerlukan waktu dan upaya yang kontinu dari orang tua. Dengan memberikan dukungan yang konsisten dan kesempatan untuk belajar dan berkembang, orang tua dapat membantu anak mengembangkan rasa percaya diri yang kuat dan positif.\",', 1),
(10, 'Generasi Digital dan Model Pengasuhan Positif', 'Muhammad Faturrahman Putra', 'article5.png', '2024-06-09', '\"Generasi digital, yang tumbuh di era teknologi informasi dan internet, membutuhkan pendekatan pengasuhan yang berbeda. Orang tua perlu memahami dan mengakomodasi kebutuhan anak-anak dalam menghadapi dunia digital yang begitu kompleks. Model pengasuhan positif dalam konteks ini adalah memberikan arahan yang jelas tentang penggunaan teknologi, mengajarkan etika digital yang baik, dan menjadi contoh yang baik dalam penggunaan teknologi.\",\r\n        \"Penting bagi orang tua untuk membatasi waktu screen time anak-anak dan mengarahkan mereka pada aktivitas yang lebih bermanfaat. Selain itu, membangun komunikasi yang baik dengan anak-anak tentang penggunaan teknologi dapat membantu mereka memahami dampak positif dan negatifnya. Dengan demikian, anak-anak dapat belajar menggunakan teknologi secara bijaksana dan bertanggung jawab.\",\r\n        \"Model pengasuhan positif juga mencakup memberikan dorongan dan pujian atas pencapaian anak-anak dalam penggunaan teknologi yang positif. Hal ini dapat meningkatkan rasa percaya diri anak-anak dan memotivasi mereka untuk terus berkembang dalam penggunaan teknologi. Selain itu, memberikan batasan yang jelas tentang konten yang boleh diakses oleh anak-anak juga penting untuk menjaga keamanan dan kesejahteraan mereka dalam dunia digital.\",\r\n        \"Dalam menghadapi generasi digital, orang tua perlu memahami bahwa pendekatan pengasuhan yang efektif adalah yang adaptif dan responsif terhadap perubahan yang terjadi dalam teknologi dan kehidupan sosial anak-anak. Dengan memadukan antara penggunaan teknologi yang bijaksana dan model pengasuhan yang positif, orang tua dapat membantu anak-anak mengembangkan potensi mereka secara optimal dalam era digital.\",', 1),
(11, 'Cara Orangtua Menyikapi Anak Introvert dan Ekstrovert', 'Adityan Franodi', 'article6.png', '2024-06-09', '\"Orang tua memiliki peran penting dalam menyikapi anak yang memiliki kepribadian introvert atau ekstrovert. Anak introvert cenderung lebih tertutup dan cenderung menyukai kesendirian. Orang tua perlu memberikan dukungan dan pemahaman kepada anak introvert agar merasa nyaman dengan diri mereka sendiri dan tidak merasa terbebani untuk berinteraksi sosial.\",\r\n        \"Di sisi lain, anak ekstrovert cenderung lebih terbuka dan energik dalam berinteraksi sosial. Orang tua perlu memberikan kesempatan kepada anak ekstrovert untuk berinteraksi dan berekspresi sesuai dengan kepribadian mereka. Hal ini dapat dilakukan dengan mendukung anak untuk mengikuti aktivitas sosial yang sesuai dengan minat dan bakat mereka.\",\r\n        \"Penting bagi orang tua untuk tidak memaksakan anak untuk berubah menjadi sesuai dengan ekspektasi sosial tertentu. Sebaliknya, orang tua perlu menerima dan menghargai kepribadian unik anak mereka, baik itu introvert maupun ekstrovert. Dengan memberikan dukungan yang tepat, orang tua dapat membantu anak mengembangkan potensi mereka sesuai dengan kepribadian yang mereka miliki.\",\r\n        \"Selain itu, orang tua juga perlu memahami bahwa kepribadian anak dapat berubah seiring dengan perkembangan mereka. Oleh karena itu, penting untuk selalu terbuka dan responsif terhadap perubahan dalam kepribadian anak dan memberikan dukungan yang konsisten dalam setiap tahapan perkembangannya.\",', 1),
(12, 'Cara Efektif Belajar Online', 'Letty Latifani Arifah', 'article7.jpg', '2024-06-09', '\"Belajar online membutuhkan pendekatan yang berbeda dibandingkan belajar di dalam kelas. Untuk belajar secara efektif secara online, penting bagi siswa untuk memiliki lingkungan belajar yang tenang dan nyaman. Pastikan juga untuk memiliki koneksi internet yang stabil agar proses belajar tidak terganggu.\",\r\n        \"Selain itu, penting untuk membuat jadwal belajar yang teratur dan disiplin dalam mengikutinya. Tentukan waktu-waktu yang tepat untuk belajar dan istirahat agar proses belajar lebih efektif. Selain itu, pastikan untuk memanfaatkan teknologi yang tersedia, seperti aplikasi pembelajaran online dan platform video konferensi, untuk memperkaya pengalaman belajar Anda.\",\r\n        \"Selama belajar online, penting juga untuk tetap berinteraksi dengan pengajar dan teman-teman sekelas. Manfaatkan fitur-fitur komunikasi yang disediakan oleh platform pembelajaran online untuk bertanya dan berdiskusi. Hal ini dapat membantu Anda memahami materi dengan lebih baik dan menjaga motivasi dalam belajar.\",\r\n        \"Terakhir, tetaplah terbuka terhadap tantangan dan kesulitan yang mungkin Anda hadapi selama belajar online. Jangan ragu untuk meminta bantuan dari pengajar atau teman sekelas jika mengalami kesulitan dalam memahami materi. Dengan sikap yang terbuka dan proaktif, Anda dapat belajar secara efektif meskipun dalam situasi pembelajaran online.\",\r\n', 1),
(13, 'Pentingnya Menjaga Kesehatan Mental Anak', 'Muhammad Thoriq Al-Faruq', 'article8.jpg', '2024-06-09', '\"Kesehatan mental anak merupakan aspek penting yang perlu diperhatikan oleh orang tua. Anak yang memiliki kesehatan mental yang baik cenderung lebih bahagia, produktif, dan mampu mengatasi berbagai tantangan dalam kehidupan. Oleh karena itu, penting bagi orang tua untuk menjaga dan memperhatikan kesehatan mental anak sejak dini.\",\r\n        \"Salah satu cara menjaga kesehatan mental anak adalah dengan menciptakan lingkungan yang aman dan mendukung di rumah. Berikan perhatian dan waktu yang cukup kepada anak, dengarkan keluh kesah mereka, dan berikan dukungan emosional yang mereka butuhkan. Hal ini dapat membantu anak merasa dihargai dan didukung dalam menghadapi berbagai situasi.\",\r\n        \"Selain itu, penting juga untuk memberikan contoh yang baik dalam mengelola emosi dan mengatasi stres. Anak cenderung meniru perilaku orang tua, sehingga penting untuk memberikan contoh yang positif dalam menghadapi berbagai situasi sulit. Dorong anak untuk mengembangkan keterampilan sosial dan emosionalnya, seperti mengatasi konflik dan mengelola stres.\",\r\n        \"Jangan lupakan pentingnya aktivitas fisik dalam menjaga kesehatan mental anak. Aktivitas fisik dapat membantu mengurangi stres dan meningkatkan suasana hati anak. Ajak anak untuk bermain di luar rumah, melakukan olahraga, atau aktivitas fisik lainnya yang disukai oleh mereka.\",', 1),
(14, 'Strategi Efektif Mengelola Waktu Belajar Anak', 'Tiara Lorenza', 'article9.jpg', '2024-06-09', ' \"Mengelola waktu belajar anak merupakan hal penting dalam memastikan bahwa mereka dapat belajar dengan efektif dan efisien. Salah satu strategi efektif adalah dengan membuat jadwal belajar yang teratur dan konsisten. Tentukan waktu-waktu yang tepat untuk belajar, istirahat, dan bermain agar anak dapat belajar dengan fokus dan tetap terjaga kesehatan mentalnya.\",\r\n        \"Selain itu, penting untuk menciptakan lingkungan belajar yang kondusif di rumah. Pastikan anak memiliki tempat yang nyaman dan bebas dari gangguan untuk belajar. Berikan juga perlengkapan belajar yang cukup agar mereka dapat belajar dengan maksimal.\",\r\n        \"Libatkan anak dalam pembuatan jadwal belajar mereka. Dengan melibatkan mereka, anak akan merasa memiliki tanggung jawab terhadap waktu belajar mereka sendiri. Hal ini dapat membantu mereka untuk lebih disiplin dalam mengikuti jadwal belajar yang telah dibuat.\",\r\n        \"Selain itu, berikan pujian dan dorongan kepada anak saat mereka berhasil mengikuti jadwal belajar dengan baik. Hal ini dapat meningkatkan motivasi dan kepercayaan diri anak dalam belajar. Dengan menerapkan strategi-strategi ini, orang tua dapat membantu anak mengelola waktu belajar mereka dengan lebih efektif dan efisien.\",', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_kidspedia`
--

CREATE TABLE `kategori_kidspedia` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategori_kidspedia`
--

INSERT INTO `kategori_kidspedia` (`id`, `nama`) VALUES
(1, 'Video Belajar'),
(2, 'Lembar Mewarnai\r\n');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kidspedia`
--

CREATE TABLE `kidspedia` (
  `id` int(11) NOT NULL,
  `kategori_id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `foto` text NOT NULL,
  `link` text NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kidspedia`
--

INSERT INTO `kidspedia` (`id`, `kategori_id`, `judul`, `foto`, `link`, `admin_id`) VALUES
(1, 1, 'WHERE IS SISTER? HERE I AM, HOW ARE YOU TODAY? LAGU BAHASA INGGRIS UNTUK ANAK PAUD-TK-SD', 'video1.png', 'https://www.youtube.com/watch?v=QMitniFVmkY', 1),
(2, 1, 'Cara Membuat Diorama Siklus Hidup Kupu Kupu 3D | Alat Peraga IPA SD Metamorfosis Sederhana', 'video2.png', 'https://www.youtube.com/watch?v=PqSMWgg_U9k&t=1s&pp=ygVaQ2FyYSBNZW1idWF0IERpb3JhbWEgU2lrbHVzIEhpZHVwIEt1cHUgS3VwdSAzRCB8IEFsYXQgUGVyYWdhIElQQSBTRCBNZXRhbW9yZm9zaXMgU2VkZXJoYW5h', 1),
(3, 1, 'Kumpulan Kolase Dari Biji Bijian|| 33 Ide Gambar Kolase dari Biji Bijian', 'video3.png', 'https://www.youtube.com/watch?v=b7p812Nbnos&pp=ygVIS3VtcHVsYW4gS29sYXNlIERhcmkgQmlqaSBCaWppYW58fCAzMyBJZGUgR2FtYmFyIEtvbGFzZSBkYXJpIEJpamkgQmlqaWFu', 1),
(5, 1, 'LIRIK DAN GERAK LAGU I AM A LITTLE TEAPOT SHORT AND STOUT. LAGU BAHASA INGGRIS UNTUK ANAK PAUD-TK-SD', 'video4.png', 'https://www.youtube.com/watch?v=PV7zlYcwchQ&pp=ygVkTElSSUsgREFOIEdFUkFLIExBR1UgSSBBTSBBIExJVFRMRSBURUFQT1QgU0hPUlQgQU5EIFNUT1VULiBMQUdVIEJBSEFTQSBJTkdHUklTIFVOVFVLIEFOQUsgUEFVRC1USy1TRA%3D%3D', 1),
(11, 1, 'Kolase dari Daun Kering Mudah dan Menarik', 'video5.png', 'https://www.youtube.com/watch?v=8rKyGpQkpq0&t=1s', 1),
(12, 1, 'HELLO SONG FOR KINDERGARTEN. GREETING SONG, HELLO .. HELLO HOW ARE YOU? LAGU PEMBUKA PEMBELAJARAN', 'video6.png', 'https://www.youtube.com/watch?v=TnZLfYh-wuA', 1),
(13, 1, 'ALPHABET SONG , ABCDEF . VERSI TERBARU . LAGU BAHASA INGGRIS UNTUK ANAK PAUD-TK-SD. BAGIAN KE 1', 'video7.png', 'https://www.youtube.com/watch?v=riM3w1mopzw', 1),
(14, 1, 'LAGU TEMA PANCA INDRA SPESIFIKASI FUNGSI MATA, LAGU BAHASA INGGRIS UNTUK ANAK PAUD-TK-SD', 'video8.png', 'https://www.youtube.com/watch?v=4Oh3i_8uzZ0', 1),
(15, 1, '170 Ide Kreatif Membuat Kerajinan Stik Es Krim Mudah || Easy DIY Crafts from Popsicle Sticks', 'video9.png', 'https://www.youtube.com/watch?v=hRC-FhjdlK0', 1),
(16, 1, '15 Ide Kreatif Membuat Mainan Anak dari Barang Bekas | Toddler activity', 'video10.png', 'https://www.youtube.com/watch?v=Rx0Y4yMMzwY&t=1s', 1),
(17, 1, 'Ide Dekorasi Ruang Kelas Kreatif dan Menarik', 'video11.png', 'https://www.youtube.com/watch?v=HymRIAtOPUw', 1),
(18, 1, '1 JAM LAGU HARI PERTAMA AKU MASUK SEKOLAH - SETEL LAGU INI UNTUK MENYAMBUT SISWA BARU DI PAGI HARI❤️', 'video12.png', 'https://www.youtube.com/watch?v=JWz46jnpETc', 1),
(19, 2, 'Gambar Domba', 'mewarnai1.png', 'https://drive.google.com/file/d/1Jmn7gVs_AL_dKhn67ew34_n-d-2KyAZH/view', 1),
(20, 2, 'Gambar Kebun', 'mewarnai2.png', 'https://drive.google.com/file/d/1iq0MKP5XPv_P8JJl9mPhBNBtGowoxyOP/view', 1),
(21, 2, 'Gambar Bunga', 'mewarnai3.png', 'https://drive.google.com/file/d/15CSiHCE_yxOMMRsJgp0ORpENYo6kSTRh/view', 1),
(22, 2, 'Gambar Sekolah', 'mewarnai4.png', 'https://drive.google.com/file/d/1fNDP6NOchOQQ2dll_95QHvP095_sYUwC/view', 1),
(23, 2, 'Gambar Helikopter', 'mewarnai5.png', 'https://drive.google.com/file/d/1ay9XPrF7TEOacbI84uoJvnn6dOpLgcTu/view', 1),
(24, 2, 'Gambar Kuda', 'mewarnai6.png', 'https://drive.google.com/file/d/1E3iP4hcOkixdI3PbI55HYrqDRh9dP5Wq/view', 1),
(25, 2, 'Gambar Ibu', 'mewarnai7.png', 'https://drive.google.com/file/d/1H2HwPqcJ-SwFWel_Hx6O3ObAG2kekwh2/view', 1),
(26, 2, 'Gambar Penyu', 'mewarnai8.png', 'https://drive.google.com/file/d/1h453eMLQ4L1WcZXqync57zhxYlHjc5cz/view', 1),
(27, 2, 'Gambar Kucing', 'mewarnai9.png', 'https://drive.google.com/file/d/1-F5frzyfzE3ly1DOUdL1JjSB4bXpSKce/view', 1),
(28, 2, 'Gambar Pengunungan', 'mewarnai10.png', 'https://drive.google.com/file/d/1kQ2_5jejcHV2pUo1f1Hdua3iSeN-W0zP/view', 1),
(29, 2, 'Gambar Ikan', 'mewarnai11.png', 'https://drive.google.com/file/d/13vaHNlsNLvyN0SPBZAbed537wLu2gPkY/view', 1),
(30, 2, 'Gambar Bebek', 'mewarnai12.png', 'https://drive.google.com/file/d/1ppG9bEN4862baYSroCWDQmijGNpHukh-/view', 1),
(31, 2, 'Gambar Dinosaurus', 'mewarnai13.png', 'https://drive.google.com/file/d/1mKKtQ9huQIpGqEfkf6bJUtu0QYcsYK8p/view', 1),
(32, 2, 'Gambar Pantai', 'mewarnai14.png', 'https://drive.google.com/file/d/1WbrFPuKqPVjVKIQXgI5hbRdRAnNLeA1L/view', 1),
(33, 2, 'Gambar Kelinci', 'mewarnai15.png', 'https://drive.google.com/file/d/1fCEwEZTT81SxnzAkcpe0A4ZoNMzdAZJ_/view', 1),
(34, 2, 'Gambar Pesawat', 'mewarnai16.png', 'https://drive.google.com/file/d/1JEPKx4GOZfXkK6unZ5B6J2LQnyDggWot/view', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `komunitas`
--

CREATE TABLE `komunitas` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `foto` text NOT NULL,
  `deskripsi` text NOT NULL,
  `link_daftar` text NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `komunitas`
--

INSERT INTO `komunitas` (`id`, `nama`, `foto`, `deskripsi`, `link_daftar`, `admin_id`) VALUES
(1, 'Calon Orangtua', 'komunitas1.png', 'Komunitas calon orangtua merupakan sebuah wadah untuk individu atau pasangan yang mempersiapkan diri menjadi orangtua. Komunitas ini bertujuan untuk memberikan informasi, sumber daya, dan dukungan emosional yang dibutuhkan dalam perjalanan menuju kehamilan dan pengasuhan anak. Tidak hanya itu saja, di komunitas dapat berbagi tips dan pengalaman sesama anggota.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(2, 'Ibu Hamil', 'komunitas2.png', 'Mendukung bagi para wanita yang sedang menjalani masa kehamilan. Memberikan informasi, edukasi, dan dukungan emosional yang dibutuhkan selama kehamilan. Para anggota dapat berbagi pengalaman pribadi, bertukar tips, dan mendapatkan nasihat dari para ahli serta sesama ibu hamil. Komunitas ini mencakup berbagai topik penting seperti perkembangan janin, nutrisi selama kehamilan, dan masih banyak lagi. \r\n', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(5, 'New Born', 'komunitas3.png', 'Tempat dimana kehangatan dan dukungan yang diperlukan para orang tua baru yang sedang menjalani masa-masa awal kehidupan bayi mereka. Komunitas ini bertujuan untuk memberikan informasi, sumber daya, dan dukungan emosional yang diperlukan dalam merawat bayi baru lahir, sehingga setiap orang tua dapat merasa percaya diri dan siap menghadapi tantangan serta kebahagiaan dalam merawat buah hati mereka.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(6, 'Cegah Baby Blues', 'komunitas4.png', 'Komunitas yang mendukung bagi para ibu baru yang ingin mencegah ataupun mengatasi baby blues serta berbagai tantangan emosional yang mungkin muncul setelah melahirkan. Disini menyediakan beberapa informasi, dan dukungan emosional yang diperlukan agar para ibu dapat menjalani masa-masa awal pasca melahirkan dengan lebih tenang dan percaya diri.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(7, 'Ayah Cermat', 'komunitas5.png', 'Dalam komunitas ini dikhususkan untuk para ayah yang ingin mempelajari lebih dalam bagaimana pengasuhan anak secara cermat. Para ayah dapat berbagi pengalaman, tips, dan juga mendapatkan dukungan dalam menjalankan peran sebagai ayah yang penuh perhatian.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(8, 'Parenting Kreatif', 'komunitas6.png', 'Orang tua dimotivasi untuk menggunakan pendekatan kreatif dalam mendidik anak-anak mereka. Komunitas ini melakukan hal-hal seperti workshop seni, proyek DIY, dan aktivitas keluarga kreatif untuk membantu orang tua mengembangkan cara-cara baru dan menyenangkan untuk mendidik anak-anak mereka.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(9, 'Single Parents', 'komunitas7.png', 'Komunitas single parents adalah tempat penuh dukungan bagi para orang tua tunggal dengan tanggung jawab ganda dalam mengasuh anak. Disini anggota dapat berbagi pengalamannya dan memberikan nasihat maupun solusi sesama orang tua tunggal.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(10, 'Gizi Anak', 'komunitas8.png', 'Tujuan komunitas ini adalah untuk meningkatkan kesadaran orang tua tentang pentingnya gizi seimbang bagi perkembangan anak. Untuk membantu orang tua memilih makanan yang sehat dan bergizi, kami menyelenggarakan seminar kesehatan, kelas memasak, dan konsultasi gizi. Program kami mencakup edukasi tentang nutrisi, perencanaan menu, dan saran praktis untuk mengatasi masalah makan anak.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(11, 'Teen Parents', 'komunitas9.png', 'Komunitas dengan sebuah ruang yang mendukung remaja yang sedang menjalani peran sebagai orang tua. Di sini, Anda akan menemukan dukungan emosional, berbagi pengalaman, serta tips praktis dari sesama remaja dan ahli parenting.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(12, 'Special Needs', 'komunitas10.png', 'Anda dapat berbagi pengalaman, mencari saran dari ahli, dan menemukan strategi efektif untuk mendukung perkembangan anak Anda. Komunitas ini bertujuan untuk menciptakan lingkungan yang inklusif dan empati, di mana setiap orang tua merasa diterima dan didukung dalam perjalanannya.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(13, 'Mental Health si Kecil', 'komunitas11.png', 'Mendukung orang tua dalam menjaga kesehatan mental anak-anak mereka. Di sini, Anda akan menemukan informasi penting, tips praktis, dan dukungan dari para ahli tentang cara mengenali dan mengatasi masalah kesehatan mental pada anak.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1),
(28, 'Curhatan Hati Orang Tua', 'foto-1718264410013.png', 'Disini, Anda bisa menceritakan pengalaman, tantangan, dan kebahagiaan Anda dalam menjalani peran sebagai orang tua. Dengan saling mendengarkan dan berbagi, kita dapat menemukan kekuatan dan inspirasi untuk menghadapi berbagai situasi.', 'https://docs.google.com/forms/d/e/1FAIpQLSfLEaapoXvPycael0iLXQ-4J2bLrJpnBH3xfhfv65sXnBpCCQ/viewform', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `mitra`
--

CREATE TABLE `mitra` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `logo` text NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mitra`
--

INSERT INTO `mitra` (`id`, `nama`, `logo`, `deskripsi`, `admin_id`) VALUES
(29, 'KARYA Kreatif GURU Paud', 'mitra1.png', 'Menyediakan video belajar dan lembar mewarnai pada Kidspedia', 1),
(74, 'Guru SD.id', 'mitra2.png', 'Menyediakan video belajar yang ditaruh di bagian Kidspedia pada Kidspedia.', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `webinar`
--

CREATE TABLE `webinar` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `foto` text NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `narasumber` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `waktu` time NOT NULL,
  `harga` varchar(255) NOT NULL,
  `link_daftar` text NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `webinar`
--

INSERT INTO `webinar` (`id`, `judul`, `foto`, `deskripsi`, `narasumber`, `tanggal`, `waktu`, `harga`, `link_daftar`, `admin_id`) VALUES
(6, 'Pengaruh Pendidikan Terhadap Parenting', 'foto-1718458403221.png', 'Webinar ini akan membahas terkait bagaimana tingkat pendidikan orang tua dapat mempengaruhi gaya pengasuhan anak mereka. Pada webinar ini akan menjelaskan bagaimana pendidikan dapat membekali orang tua dengan pengetahuan dan keterampilan yang mereka butuh', 'Dr. Putra Santoso M.Psi. Psikolog', '2024-06-17', '22:50:00', '30000', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform?usp=sharing', 1),
(7, 'Peran Orang Tua untuk Masa Depan Anak', 'foto-1718458425481.png', 'Semua orang tua ingin memberikan yang terbaik untuk masa depan anak-anak mereka. Namun, peran kita tidak selalu mudah dan sering kali penuh tantangan. Webinar \"Peran Ortu untuk Masa Depan Anaknya\" bertujuan untuk membantu para orang tua memahami tanggung ', 'Dr. Ratna Sariwati M.Psi. Psikolog', '2024-06-22', '14:00:00', 'Gratis', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform?usp=sharing', 1),
(8, 'Menerapkan Parenting Modern pada Era Digital untuk Anak Anda', 'foto-1718458442216.png', 'Membesarkan anak di era digital menghadirkan tantangan dan peluang unik bagi orang tua. Di satu sisi, teknologi menawarkan banyak sekali sumber daya dan alat yang dapat membantu kita dalam membesarkan anak. Webinar ini bertujuan untuk membantu orang tua y', 'Dr. Dalton Marty.S.Psi.Psikolog', '2024-06-23', '16:00:00', '50000', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform?usp=sharing', 1),
(9, 'Strategi Parenting Efektif untuk New Born', 'foto-1718458476230.png', 'Dapatkan panduan praktis dari para ahli tentang pemberian ASI, teknik menenangkan bayi, perawatan kesehatan dasar, dan stimulasi perkembangan. Sesi ini akan membantu Anda memahami kebutuhan penting bayi baru lahir dan membangun rutinitas yang sehat. ', 'Dr. Antoni Marty.S.Psi.Psikolog ', '2024-06-25', '10:30:00', 'Gratis', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform?usp=sharing', 1),
(10, 'Cegah Stunting : Menerapkan Asupan Gizi yang Tepat untuk Anak', 'foto-1718458495471.png', 'Dalam sesi ini, para ahli gizi akan membahas pentingnya nutrisi seimbang, memberikan panduan praktis tentang makanan yang mendukung perkembangan anak, serta strategi pencegahan stunting sejak dini.', 'Dr. Na kang Lim.S.Psi.Psikolog', '2024-06-26', '11:30:00', '25000', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform', 1),
(11, 'Ayah dan Anak : Tips Parenting yang Efektif untuk Anak', 'foto-1718458572176.png', 'Berbagi tips praktis dalam membangun komunikasi yang baik, peran ayah dalam mendukung perkembangan emosional anak, serta cara-cara untuk terlibat aktif dalam kehidupan sehari-hari anak', 'Dr. Kratos Tatew.S.Psi.Psikolog ', '2024-06-27', '14:30:00', '30000', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform', 1),
(12, 'Menjaga kesehatan mental anak maupun ortu', 'foto-1718458611211.png', 'Menghadapi tekanan hidup sehari-hari bisa mempengaruhi kesehatan mental kita dan anak-anak kita. Webinar ini menawarkan solusi praktis untuk menjaga kesejahteraan mental dan mengelola stress. Kami akan memberikan tips bagaimana orang tua bisa mendukung ke', ' Dr. Dalton Marty.S.Psi.Psikolog', '2024-06-28', '10:30:00', 'Gratis', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform', 1),
(13, 'Strategi penanggulangan stunning dan bullying pada anak', 'foto-1718458648304.png', 'Stunting dan bullying adalah masalah yang memerlukan perhatian serius dari orang tua dan pendidik. Webinar ini memberikan panduan praktis tentang bagaimana mencegah atau mengatasi stunting melalui pola makan dan kesehatan yang baik, serta strategi untuk m', 'Dr. Ratna Sariwati M.Psi. Psikolog', '2024-06-29', '09:30:00', 'Gratis', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform', 1),
(14, 'Menjalin keakraban dengan anak semasa sebagai teman', 'foto-1718458671135.png', 'Hubungan yang dekat dengan anak remaja sangat penting untuk perkembangan mereka. Dengan mengikuti kegiatan ini, Anda akan mendapatkan panduan tentang cara menjalin keakraban dengan anak remaja melalui komunikasi yang efektif dan empati. Para ahli akan ber', 'Dr. Putra Santoso M.Psi. Psikolog', '2024-07-01', '14:45:00', '30000', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform', 1),
(15, 'Kesabaran dalam mendidik anak', 'foto-1718458687509.png', 'Mengasuh anak bisa menjadi tugas yang menantang dan sering kali menguji kesabaran orang tua. Kami akan memberikan tips dan strategi untuk menjaga kesabaran serta bagaimana cara berkomunikasi yang efektif dengan anak. Orang tua akan belajar bagaimana menja', 'Dr. Raka Setiawan S.Psi. Psikolog', '2024-07-02', '23:30:00', '20000', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform', 1),
(16, 'Pulihkan luka, wariskan cinta', 'foto-1718458704932.png', 'Studi menunjukkan bahwa luka pengasuhan dapat \"diwariskan\" dari generasi ke generasi. Karena inilah kekuatan alam bawah sadar, ini dapat bertahan selama bertahun-tahun. Orang tua kita mungkin juga mengalami kerusakan yang disebabkan oleh pola asuh yang me', 'Dr. Jordan Smith  M.Psi. Psikolog', '2024-07-04', '10:00:00', '20000', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform', 1),
(17, 'Perkembangan Anak Kebutuhan Khusus', 'foto-1718458725911.png', 'Berbagai aspek perkembangan, termasuk intervensi dini, pendidikan inklusif, dan cara membangun lingkungan yang mendukung. Webinar ini juga menyediakan tips praktis bagi orang tua dalam menghadapi tantangan sehari-hari dan mengoptimalkan potensi anak. ', ' Dr. Jonathan Joestar M.Psi. Psikolog', '2024-07-05', '14:00:00', 'Gratis', 'https://docs.google.com/forms/d/e/1FAIpQLSeEBJo8azqIMyLfP1siFcbe24iSCb2Yd7IMRlg5Zvyo157bJw/viewform', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id_artikel_fk` (`admin_id`);

--
-- Indeks untuk tabel `kategori_kidspedia`
--
ALTER TABLE `kategori_kidspedia`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kidspedia`
--
ALTER TABLE `kidspedia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id_kidspedia_fk` (`admin_id`),
  ADD KEY `kategori_id_fk` (`kategori_id`);

--
-- Indeks untuk tabel `komunitas`
--
ALTER TABLE `komunitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id_komunitas_fk` (`admin_id`);

--
-- Indeks untuk tabel `mitra`
--
ALTER TABLE `mitra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_mitra_id_fk` (`admin_id`);

--
-- Indeks untuk tabel `webinar`
--
ALTER TABLE `webinar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id_webinar_fk` (`admin_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `kategori_kidspedia`
--
ALTER TABLE `kategori_kidspedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `kidspedia`
--
ALTER TABLE `kidspedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT untuk tabel `komunitas`
--
ALTER TABLE `komunitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `mitra`
--
ALTER TABLE `mitra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT untuk tabel `webinar`
--
ALTER TABLE `webinar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `artikel`
--
ALTER TABLE `artikel`
  ADD CONSTRAINT `admin_id_artikel_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);

--
-- Ketidakleluasaan untuk tabel `kidspedia`
--
ALTER TABLE `kidspedia`
  ADD CONSTRAINT `admin_id_kidspedia_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`),
  ADD CONSTRAINT `kategori_id_fk` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_kidspedia` (`id`);

--
-- Ketidakleluasaan untuk tabel `komunitas`
--
ALTER TABLE `komunitas`
  ADD CONSTRAINT `admin_id_komunitas_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);

--
-- Ketidakleluasaan untuk tabel `mitra`
--
ALTER TABLE `mitra`
  ADD CONSTRAINT `admin_mitra_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);

--
-- Ketidakleluasaan untuk tabel `webinar`
--
ALTER TABLE `webinar`
  ADD CONSTRAINT `admin_id_webinar_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
