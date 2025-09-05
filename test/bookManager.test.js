const Book = require('../book');
const BookManager = require('../bookManager');

describe('BookManager', () => {
    let bookManager;

    beforeEach(() => {
        bookManager = new BookManager();
    });


    test('Test menambahkan buku', () => {
        const book = new Book("Test Book", "Test Author", 2023);
        bookManager.addBook(book);
        expect(bookManager.getBookCount()).toBe(1);
    });

    test('Test menghapus buku yang ada', () => {
        const book = new Book("To Remove", "Author", 2023);
        bookManager.addBook(book);

        const removed = bookManager.removeBook("To Remove");
        expect(removed).toBe(true);
        expect(bookManager.getBookCount()).toBe(0);
    });

    test('Test menghapus buku yang tidak ada', () => {
        bookManager.addBook(new Book("Existing Book", "Some Author", 2020));
        const removed = bookManager.removeBook("Non Existent Book");
        expect(removed).toBe(false);
        expect(bookManager.getBookCount()).toBe(1);
    });

    test('Test mencari buku berdasarkan author', () => {
        const book1 = new Book("Book One", "Author A", 2021);
        const book2 = new Book("Book Two", "Author B", 2022);
        const book3 = new Book("Book Three", "Author A", 2023);

        bookManager.addBook(book1);
        bookManager.addBook(book2);
        bookManager.addBook(book3);

        const foundBooks = bookManager.findBooksByAuthor("Author A");
        expect(foundBooks.length).toBe(2);
        expect(foundBooks[0].title).toBe("Book One");
    });

    test('Test mendapatkan semua buku', () => {
        const book1 = new Book("First Book", "Author 1", 2024);
        const book2 = new Book("Second Book", "Author 2", 2025);

        bookManager.addBook(book1);
        bookManager.addBook(book2);

        const allBooks = bookManager.getAllBooks();
        expect(allBooks.length).toBe(2);
        expect(allBooks).toEqual([book1, book2]);
    });

    // --- TEST CASE YANG SENGAJA DIBUAT GAGAL ---
    
    /**
     * Test case ini sengaja dibuat gagal untuk menunjukkan bagaimana laporan
     * pengujian menampilkan test yang tidak sesuai ekspektasi.
     */
    test('FAIL DEMO: Menambahkan buku tapi ekspektasi jumlah salah', () => {
        const book = new Book("Demo Book", "Demo Author", 2025);
        bookManager.addBook(book);
        // Seharusnya 1, tapi sengaja ditulis 5 agar test gagal.
        expect(bookManager.getBookCount()).toBe(5); 
    });
});