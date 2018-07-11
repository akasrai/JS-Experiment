-- 1. Create necessary table with proper primary, foreign keys
    CREATE TABLE users (
        id              SERIAL PRIMARY KEY,
        name            varchar(255)
    );

    CREATE TABLE authors (
        id              SERIAL PRIMARY KEY,
        name            varchar(255)
    );

    CREATE TABLE books (
        id              SERIAL PRIMARY KEY,
        isbn           varchar(255) NOT NULL,
        name            varchar(255),
        auther_id       int REFERENCES authors(id)
    );

    CREATE TABLE loans (
        id              SERIAL PRIMARY KEY,
        borrower_id     int REFERENCES users(id),
        book_id         int REFERENCES books(id),
        issued_date     date,
        due_date        date,
        returned_date   date
    );

    CREATE TABLE categories (
        id          SERIAL PRIMARY KEY,
        name        varchar(100)
    );

    CREATE TABLE books_categories (
        id              SERIAL PRIMARY KEY,
        book_id         int REFERENCES books(id),
        category_id     int REFERENCES categories(id)
    );

-- 2. Insert 10 books; Each book will have one author; Some authors should have multiple books.
    INSERT INTO authors (name) VALUES
        ('Shrijan'), ('Shankar'), ('Manish'), ('Ujwal'), ('Anup'), ('Ayush');

    INSERT INTO books (isban, name, author_id) VALUES
        ('123VB4', 'JS For Dummies', '1'),
        ('124VB4', 'CLet us C', '2'),
        ('126GF4', 'Java From Core', '3'),  
        ('2456YU', 'C++ Programming','1'), 
        ('6890TY', 'Data Structure and Algorithm','2'),
        ('9087VC', 'Data Mining','3'),
        ('5343FG', 'Hello C#','4'),
        ('092NUY', 'Story of Python','2'),
        ('BNU66U', 'CSS in 10 days','1'),
        ('GU452A', 'Node in Leapfrog','1');
        ('YUIVB4', 'Why Vitamin C','5'),
        ('184UI4', 'Health in Nepal','5'),
        ('UI7GF4', 'Sir Alex','6');

-- 3. Assign categories to each books; One book can have many categories
    INSERT INTO  categories (name) VALUES
        ('Computer Programming'),
        ('Data Science'),
        ('Health'),
        ('Sport');

    
    INSERT INTO books_categories ( book_id, category_id ) VALUES
        (1,1),
        (2,1),
        (3,1),
        (4,1),
        (5,2),
        (6,2),
        (7,1),
        (8,2),
        (9,1),
        (10,1),
        (11,3),
        (12,3),
        (13,4);

-- 4. Insert 5 users

    INSERT INTO users ( name ) VALUES
        ('Jhon Doe'),
        ('Ayush Rimal'),
        ('Harry Portrer'),
        ('Leonel Messi'),
        ('Cristaino Ronaldo');

-- 5. Record 10 loan activity; One book can only be loaned by one user at a time
    
    INSERT INTO loans ( borrower_id, book_id, issued_date, due_date, returned_date) VALUES
        (1, 1, '2018-01-08', '2018-02-08','2018-02-01' ),
        (1, 2, '2018-02-10', '2018-03-10', NULL ),
        (2, 1, '2018-03-20', '2018-04-20','2018-04-20' ),
        (2, 3, '2018-04-21', '2018-05-21','2018-05-15' ),
        (2, 4, '2018-05-08', '2018-06-08', NULL ),
        (3, 9, '2018-04-25', '2018-05-25', NULL ),
        (4, 10,'2018-05-10', '2018-06-10', '2018-06-10' ),
        (4, 6, '2018-05-15', '2018-06-15', '2018-06-15' ),
        (4, 5, '2018-04-25', '2018-05-25', NULL),
        (5, 6, '2018-04-12', '2018-05-12', '2018-06-10' ),
        (5, 1, '2018-03-10', '2018-04-10', NULL),
        (1, 7, '2018-07-01', '2018-08-01', NULL);


    -- update books is_avail when books are taem loan
    UPDATE books SET is_avail = '0' WHERE id = book_id;

-- 6. Select available books

    -- is_avail flag is updated everytime when borrower burrows the book
    SELECT id, name FROM books WHERE is_avail = '1';

    -- Sql by join, its not working
    SELECT  books.id, name FROM books, loans 
        WHERE books.id = loans.book_id AND loans.returned_date IS NOT NULL GROUP BY books.id;

    SELECT DISTINCT books.id, books.name FROM books LEFT JOIN loans ON books.id = loans.book_id 
    WHERE loans.book_id IS NULL OR loans.returned_date IS NOT NULL;  


-- 7. Select books for a specific author; Returned list should be order by their titles
    SELECT b.name, a.name FROM authors a, books b WHERE a.id = b.author_id AND a.name = 'Shrijan' ORDER BY b.name ASC;

-- 8. Add category filter to 7;
    SELECT b.name, c.name
    FROM authors a
    JOIN books b ON a.id = b.author_id
    JOIN books_categories bc ON b.id = bc.book_id
    JOIN categories c ON c.id = bc.category_id
    WHERE a.name = 'Manish'
    AND c.name = 'Data Science';
   

-- 9. Fetch the books that were loaned between date “A” and “B”
    SELECT b.name
    FROM books b
    JOIN loans l ON b.id = l.book_id
    WHERE l.issued_date BETWEEN '2018-01-08' AND '2018-03-20';

-- 10. User wants to return a loaned book. Write an update query to make this happen.
    -- retun_date = now() can be used to give curret date
    UPDATE loans SET returned_date = now() WHERE borrower_id = 5 AND book_id = 1;

    -- ( NOT WORKING ) if user name and book name are given to update the data
        UPDATE loans
        SET returned_date = now()
        FROM users, books
        WHERE users.id=  loans.borrower_id  
        AND books.id=   loans.book_id 
        AND users.name = 'Ayush Rimal'
        AND books.name = 'CLet us C';

        UPDATE loans
        SET returned_date = now()
        WHERE borrower_id = ( SELECT id FROM users WHERE name = 'Ayush Rimal' )
        AND book_id = (SELECT id FROM books WHERE name = 'CLet us C');

-- 11. Another user wants to return multiple loaned book. Write an update query to make this happen.


-- 12. Check what happens when you want to delete an author; What needs to be done ?
    -- Added is_active column, if author is deleted is_actve is set to false and if active it is set to true
    ALTER TABLE authors ADD COLUMN is_active BOOLEAN;

    -- Updating table when delete is performed
    UPDATE authors SET is_active = '0' WHERE id = 1; -- 1 is user id

-- 13. Write a query to delete users who have not leased any books for a month
    -- Added column is_active to perform temporary deletion
    ALTER TABLE users ADD COLUMN is_active BOOLEAN;

    -- Updating users for deletion
    UPDATE users SET is_active = '0' WHERE id IN ( SELECT borrower_id FROM loans WHERE now() - returned_date < interval '30 days');


-- 14. Write a query to blacklist users who have not returned book for a month
    UPDATE users SET is_active = '0' WHERE id IN
    ( SELECT borrower_id FROM loans WHERE now() - due_date > interval '30 days' AND returned_date IS NULL );
