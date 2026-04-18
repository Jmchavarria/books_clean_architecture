const mysql = require('mysql2/promise');
const { randomUUID } = require('crypto');

const connectionConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'marlon3390',
  database: 'books',
};

const categories = [
  { name: 'Political fiction', isActive: true },
  { name: 'Fantasy', isActive: true },
  { name: 'Fiction', isActive: true },
  { name: 'Juvenile fiction', isActive: true },
  { name: 'Horror', isActive: true },
  { name: "Children's stories", isActive: true },
  { name: 'Adventure fiction', isActive: true },
];

const authors = [
  {
    name: 'Jack',
    lastname: 'London',
    birthdate: '1876-01-12',
    biography:
      'Seeded from Open Library search/authors API. Top work: The Call of the Wild.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Adventure fiction',
    isActive: true,
  },
  {
    name: 'Sax',
    lastname: 'Rohmer',
    birthdate: '1883-02-15',
    biography:
      'Seeded from Open Library search/authors API. Top work: The Insidious Dr. Fu Manchu.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Mystery fiction',
    isActive: true,
  },
  {
    name: 'Edgar Allan',
    lastname: 'Poe',
    birthdate: '1809-01-19',
    biography:
      'Seeded from Open Library search/authors API. Top work: The Murders in the Rue Morgue.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Gothic fiction',
    isActive: true,
  },
  {
    name: 'Lucy Maud',
    lastname: 'Montgomery',
    birthdate: '1874-01-01',
    biography:
      'Seeded from Open Library search/authors API. Top work: Anne of Green Gables.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Children fiction',
    isActive: true,
  },
  {
    name: 'John William',
    lastname: 'Polidori',
    birthdate: '1795-09-07',
    biography: 'Seeded from Open Library search/authors API. Top work: The Vampyre.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Horror fiction',
    isActive: true,
  },
  {
    name: 'L. Frank',
    lastname: 'Baum',
    birthdate: '1856-05-15',
    biography:
      'Seeded from Open Library search/authors API. Top work: The Wonderful Wizard of Oz.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Fantasy fiction',
    isActive: true,
  },
  {
    name: 'Edith',
    lastname: 'Nesbit',
    birthdate: '1858-08-15',
    biography:
      'Seeded from Open Library search/authors API. Top work: The Railway Children.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Juvenile fiction',
    isActive: true,
  },
  {
    name: 'Eleanor Hodgman',
    lastname: 'Porter',
    birthdate: '1868-01-01',
    biography: 'Seeded from Open Library search/authors API. Top work: Pollyanna.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Juvenile fiction',
    isActive: true,
  },
  {
    name: 'Ayn',
    lastname: 'Rand',
    birthdate: '1905-02-02',
    biography: 'Seeded from Open Library search/authors API. Top work: Anthem.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Philosophical fiction',
    isActive: true,
  },
  {
    name: 'Edgar Rice',
    lastname: 'Burroughs',
    birthdate: '1875-09-01',
    biography:
      'Seeded from Open Library search/authors API. Top work: Tarzan of the Apes.',
    countryOfBirth: 'Unknown',
    literaryGenre: 'Adventure fiction',
    isActive: true,
  },
];

const books = [
  {
    title: 'The Iron Heel',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 287.',
    authorKey: 'Jack London',
    categoryName: 'Political fiction',
    pages: 287,
    publishedYear: 1907,
    isActive: true,
  },
  {
    title: 'Brood of the Witch-Queen',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 206.',
    authorKey: 'Sax Rohmer',
    categoryName: 'Fantasy',
    pages: 206,
    publishedYear: 1924,
    isActive: true,
  },
  {
    title: 'The Narrative of Arthur Gordon Pym',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 202.',
    authorKey: 'Edgar Allan Poe',
    categoryName: 'Fiction',
    pages: 202,
    publishedYear: 1838,
    isActive: true,
  },
  {
    title: 'Emily of New Moon',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 339.',
    authorKey: 'Lucy Maud Montgomery',
    categoryName: 'Juvenile fiction',
    pages: 339,
    publishedYear: 1923,
    isActive: true,
  },
  {
    title: 'The Vampyre',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 55.',
    authorKey: 'John William Polidori',
    categoryName: 'Horror',
    pages: 55,
    publishedYear: 1819,
    isActive: true,
  },
  {
    title: 'The Sea Fairies',
    description:
      "Seeded from Open Library search API for subject:fiction. Source category: Children's stories.",
    authorKey: 'L. Frank Baum',
    categoryName: "Children's stories",
    pages: 130,
    publishedYear: 1911,
    isActive: true,
  },
  {
    title: 'The Enchanted Castle',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 186.',
    authorKey: 'Edith Nesbit',
    categoryName: 'Fantasy',
    pages: 186,
    publishedYear: 1907,
    isActive: true,
  },
  {
    title: 'Pollyanna',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 194.',
    authorKey: 'Eleanor Hodgman Porter',
    categoryName: 'Juvenile fiction',
    pages: 194,
    publishedYear: 1912,
    isActive: true,
  },
  {
    title: 'Anthem',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 98.',
    authorKey: 'Ayn Rand',
    categoryName: 'Fiction',
    pages: 98,
    publishedYear: 1936,
    isActive: true,
  },
  {
    title: 'Tarzan of the Apes',
    description:
      'Seeded from Open Library search API for subject:fiction. Source pages median: 286.',
    authorKey: 'Edgar Rice Burroughs',
    categoryName: 'Adventure fiction',
    pages: 286,
    publishedYear: 1912,
    isActive: true,
  },
];

function buildAuthorKey(name, lastname) {
  return `${name} ${lastname}`;
}

async function ensureCategory(connection, category) {
  const [rows] = await connection.query(
    'SELECT id FROM categories WHERE name = ? LIMIT 1',
    [category.name],
  );

  if (rows.length > 0) return rows[0].id;

  const id = randomUUID();
  await connection.query(
    `INSERT INTO categories (id, name, isActive, createdAt, updatedAt)
     VALUES (?, ?, ?, NOW(), NOW())`,
    [id, category.name, category.isActive],
  );
  return id;
}

async function ensureAuthor(connection, author) {
  const [rows] = await connection.query(
    'SELECT id FROM authors WHERE name = ? AND lastname = ? LIMIT 1',
    [author.name, author.lastname],
  );

  if (rows.length > 0) return rows[0].id;

  const id = randomUUID();
  await connection.query(
    `INSERT INTO authors (
      id, name, lastname, birthdate, biography, countryOfBirth, literaryGenre, isActive, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      id,
      author.name,
      author.lastname,
      author.birthdate,
      author.biography,
      author.countryOfBirth,
      author.literaryGenre,
      author.isActive,
    ],
  );
  return id;
}

async function upsertBook(connection, book, authorId, categoryId) {
  const [rows] = await connection.query(
    'SELECT id FROM books WHERE title = ? AND authorId = ? AND publishedYear = ? LIMIT 1',
    [book.title, authorId, book.publishedYear],
  );

  if (rows.length > 0) {
    await connection.query(
      `UPDATE books
       SET description = ?, pages = ?, isActive = ?, categoryId = ?, updatedAt = NOW()
       WHERE id = ?`,
      [book.description, book.pages, book.isActive, categoryId, rows[0].id],
    );
    return rows[0].id;
  }

  const id = randomUUID();
  await connection.query(
    `INSERT INTO books (
      id, title, description, authorId, pages, publishedYear, isActive, categoryId, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      id,
      book.title,
      book.description,
      authorId,
      book.pages,
      book.publishedYear,
      book.isActive,
      categoryId,
    ],
  );
  return id;
}

async function main() {
  const connection = await mysql.createConnection(connectionConfig);

  try {
    await connection.beginTransaction();

    const categoryIds = new Map();
    for (const category of categories) {
      const id = await ensureCategory(connection, category);
      categoryIds.set(category.name, id);
    }

    const authorIds = new Map();
    for (const author of authors) {
      const id = await ensureAuthor(connection, author);
      authorIds.set(buildAuthorKey(author.name, author.lastname), id);
    }

    for (const book of books) {
      const authorId = authorIds.get(book.authorKey);
      const categoryId = categoryIds.get(book.categoryName) ?? null;
      await upsertBook(connection, book, authorId, categoryId);
    }

    await connection.commit();

    console.log(
      JSON.stringify({
        categoriesSeeded: categories.length,
        authorsSeeded: authors.length,
        booksSeeded: books.length,
      }),
    );
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
