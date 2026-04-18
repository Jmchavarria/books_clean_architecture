START TRANSACTION;

-- Open Library seed:
-- Books were based on https://openlibrary.org/search.json?q=subject:fiction&fields=title,author_name,first_publish_year,number_of_pages_median,subject&limit=20
-- Author metadata was based on https://openlibrary.org/search/authors.json?q=<author-name>
-- countryOfBirth is set to 'Unknown' because Open Library author search results do not provide that field.

INSERT INTO categories (id, name, isActive, createdAt, updatedAt)
SELECT '7a25cc0a-b5ee-4c54-a49a-9cfe88d6f190', 'Political fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Political fiction');

INSERT INTO categories (id, name, isActive, createdAt, updatedAt)
SELECT 'cb40d0ff-8134-4df9-a8a8-8076536724e6', 'Fantasy', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Fantasy');

INSERT INTO categories (id, name, isActive, createdAt, updatedAt)
SELECT 'f95a0ba6-7c40-443b-9747-7a40cad6f5eb', 'Fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Fiction');

INSERT INTO categories (id, name, isActive, createdAt, updatedAt)
SELECT '98c00c9f-a79f-4c8b-a0af-a7a9282ca013', 'Juvenile fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Juvenile fiction');

INSERT INTO categories (id, name, isActive, createdAt, updatedAt)
SELECT '06dc225a-4217-4e68-af68-1a651f61f7ba', 'Horror', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Horror');

INSERT INTO categories (id, name, isActive, createdAt, updatedAt)
SELECT '8b2832f9-c9db-4160-8482-ac98f1ce6191', 'Children''s stories', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Children''s stories');

INSERT INTO categories (id, name, isActive, createdAt, updatedAt)
SELECT 'e10aa2ea-4418-4b98-a315-c48e60826a2d', 'Adventure fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Adventure fiction');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT '74d9c0a2-ab42-4a03-9f4d-cdc8999af8bf', 'Jack', 'London', '1876-01-12',
       'Seeded from Open Library search/authors API. Top work: The Call of the Wild.',
       'Unknown', 'Adventure fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Jack' AND lastname = 'London');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT '7096dd13-1d8f-4bc3-a4f3-1d40c17c0f16', 'Sax', 'Rohmer', '1883-02-15',
       'Seeded from Open Library search/authors API. Top work: The Insidious Dr. Fu Manchu.',
       'Unknown', 'Mystery fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Sax' AND lastname = 'Rohmer');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT 'a56ff7b4-15e6-4425-bcc5-74bb8fce3070', 'Edgar Allan', 'Poe', '1809-01-19',
       'Seeded from Open Library search/authors API. Top work: The Murders in the Rue Morgue.',
       'Unknown', 'Gothic fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Edgar Allan' AND lastname = 'Poe');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT 'a633c1be-8268-46d4-b731-46f41b02eb9b', 'Lucy Maud', 'Montgomery', '1874-01-01',
       'Seeded from Open Library search/authors API. Top work: Anne of Green Gables.',
       'Unknown', 'Children fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Lucy Maud' AND lastname = 'Montgomery');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT '8a50efcf-d75d-4237-a048-b58576d1c3d5', 'John William', 'Polidori', '1795-09-07',
       'Seeded from Open Library search/authors API. Top work: The Vampyre.',
       'Unknown', 'Horror fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'John William' AND lastname = 'Polidori');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT '2db07bc1-7bb4-4694-8984-c4dd73d60d75', 'L. Frank', 'Baum', '1856-05-15',
       'Seeded from Open Library search/authors API. Top work: The Wonderful Wizard of Oz.',
       'Unknown', 'Fantasy fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'L. Frank' AND lastname = 'Baum');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT 'a65c56e3-38b8-4d7a-b32f-b3a1ad0883f2', 'Edith', 'Nesbit', '1858-08-15',
       'Seeded from Open Library search/authors API. Top work: The Railway Children.',
       'Unknown', 'Juvenile fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Edith' AND lastname = 'Nesbit');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT '2f41305c-3b4b-4a72-b2aa-5374a8f7752f', 'Eleanor Hodgman', 'Porter', '1868-01-01',
       'Seeded from Open Library search/authors API. Top work: Pollyanna.',
       'Unknown', 'Juvenile fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Eleanor Hodgman' AND lastname = 'Porter');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT '46089b68-593f-4bb7-827f-565518619f49', 'Ayn', 'Rand', '1905-02-02',
       'Seeded from Open Library search/authors API. Top work: Anthem.',
       'Unknown', 'Philosophical fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Ayn' AND lastname = 'Rand');

INSERT INTO authors (id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt)
SELECT 'a5b214d5-39d0-4ccb-b7bb-9b1677cd8814', 'Edgar Rice', 'Burroughs', '1875-09-01',
       'Seeded from Open Library search/authors API. Top work: Tarzan of the Apes.',
       'Unknown', 'Adventure fiction', 1, NOW(), NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Edgar Rice' AND lastname = 'Burroughs');

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT 'e54a4386-ab85-444a-afc8-cf76214fdfcf', 'The Iron Heel',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 287.',
       a.id, 287, 1907, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Political fiction'
WHERE a.name = 'Jack' AND a.lastname = 'London'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'The Iron Heel' AND b.authorId = a.id AND b.publishedYear = 1907
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT 'eeecdd80-7edb-4e9e-a5a7-c12b82a7331f', 'Brood of the Witch-Queen',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 206.',
       a.id, 206, 1924, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Fantasy'
WHERE a.name = 'Sax' AND a.lastname = 'Rohmer'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'Brood of the Witch-Queen' AND b.authorId = a.id AND b.publishedYear = 1924
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT '640b5e1a-d17c-4035-91f5-f65f4cc0d0fa', 'The Narrative of Arthur Gordon Pym',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 202.',
       a.id, 202, 1838, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Fiction'
WHERE a.name = 'Edgar Allan' AND a.lastname = 'Poe'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'The Narrative of Arthur Gordon Pym' AND b.authorId = a.id AND b.publishedYear = 1838
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT 'f3d8f9a4-fdab-4631-a97c-a68d7d536f41', 'Emily of New Moon',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 339.',
       a.id, 339, 1923, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Juvenile fiction'
WHERE a.name = 'Lucy Maud' AND a.lastname = 'Montgomery'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'Emily of New Moon' AND b.authorId = a.id AND b.publishedYear = 1923
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT '58f8f305-b16e-4ea4-ac48-f48220c44029', 'The Vampyre',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 55.',
       a.id, 55, 1819, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Horror'
WHERE a.name = 'John William' AND a.lastname = 'Polidori'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'The Vampyre' AND b.authorId = a.id AND b.publishedYear = 1819
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT '326a9d06-5415-4206-b45b-5807757e65a3', 'The Sea Fairies',
       'Seeded from Open Library search API for subject:fiction. Source category: Children''s stories.',
       a.id, 130, 1911, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Children''s stories'
WHERE a.name = 'L. Frank' AND a.lastname = 'Baum'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'The Sea Fairies' AND b.authorId = a.id AND b.publishedYear = 1911
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT '1436ef93-32cd-4731-a5a2-f6f7c0f661a3', 'The Enchanted Castle',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 186.',
       a.id, 186, 1907, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Fantasy'
WHERE a.name = 'Edith' AND a.lastname = 'Nesbit'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'The Enchanted Castle' AND b.authorId = a.id AND b.publishedYear = 1907
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT '2c891fc5-c670-4193-89bf-85e50e731127', 'Pollyanna',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 194.',
       a.id, 194, 1912, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Juvenile fiction'
WHERE a.name = 'Eleanor Hodgman' AND a.lastname = 'Porter'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'Pollyanna' AND b.authorId = a.id AND b.publishedYear = 1912
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT '58f21c98-0faa-431c-aa93-5f0df7088f33', 'Anthem',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 98.',
       a.id, 98, 1936, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Fiction'
WHERE a.name = 'Ayn' AND a.lastname = 'Rand'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'Anthem' AND b.authorId = a.id AND b.publishedYear = 1936
  );

INSERT INTO books (id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt)
SELECT '0776bcec-9844-41ea-ba36-0a9623f84c7e', 'Tarzan of the Apes',
       'Seeded from Open Library search API for subject:fiction. Source pages median: 286.',
       a.id, 286, 1912, 1, c.id, NOW(), NOW()
FROM authors a
LEFT JOIN categories c ON c.name = 'Adventure fiction'
WHERE a.name = 'Edgar Rice' AND a.lastname = 'Burroughs'
  AND NOT EXISTS (
    SELECT 1 FROM books b WHERE b.title = 'Tarzan of the Apes' AND b.authorId = a.id AND b.publishedYear = 1912
  );

COMMIT;
