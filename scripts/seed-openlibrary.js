require('dotenv').config();

const { Client } = require('pg');

const client = new Client(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        user: process.env.DB_USERNAME || process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || process.env.DB_NAME || 'books',
      },
);

/* ============================================================
   DATABASE HELPERS
   ============================================================ */

async function tableExists(tableName) {
  const { rows } = await client.query(
    `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = $1
      ) AS exists
    `,
    [tableName],
  );

  return rows[0].exists;
}

async function assertRequiredColumns(tableName, columns) {
  const { rows } = await client.query(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = $1
    `,
    [tableName],
  );

  const existingColumns = new Set(rows.map((row) => row.column_name));

  const missingColumns = columns.filter((column) => !existingColumns.has(column));

  if (missingColumns.length > 0) {
    throw new Error(
      `La tabla "${tableName}" no contiene las columnas esperadas: ${missingColumns.join(', ')}`,
    );
  }
}

async function getColumnEnumName(tableName, columnName) {
  const { rows } = await client.query(
    `
      SELECT udt_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = $1
        AND column_name = $2
      LIMIT 1
    `,
    [tableName, columnName],
  );

  if (rows.length === 0) {
    throw new Error(`No existe la columna "${tableName}.${columnName}".`);
  }

  return rows[0].udt_name;
}

async function getEnumValues(enumName) {
  const { rows } = await client.query(
    `
      SELECT e.enumlabel
      FROM pg_type AS t
      INNER JOIN pg_enum AS e
        ON e.enumtypid = t.oid
      INNER JOIN pg_namespace AS n
        ON n.oid = t.typnamespace
      WHERE t.typname = $1
        AND n.nspname = 'public'
      ORDER BY e.enumsortorder
    `,
    [enumName],
  );

  if (rows.length === 0) {
    throw new Error(`No se encontraron valores para el enum PostgreSQL "${enumName}".`);
  }

  return rows.map((row) => row.enumlabel);
}

function findEnumValue(values, expectedValue) {
  const value = values.find((item) => item.toLowerCase() === expectedValue.toLowerCase());

  if (!value) {
    throw new Error(
      `El enum no contiene "${expectedValue}". Valores disponibles: ${values.join(', ')}`,
    );
  }

  return value;
}

/* ============================================================
   CATEGORIES
   ============================================================ */

async function ensureCategory(category, activeStatus) {
  const existing = await client.query(
    `
      SELECT id
      FROM categories
      WHERE slug = $1
      LIMIT 1
    `,
    [category.slug],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO categories (
        name,
        slug,
        description,
        status
      )
      VALUES (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING id
    `,
    [category.name, category.slug, category.description, activeStatus],
  );

  return result.rows[0].id;
}

/* ============================================================
   AUTHORS
   ============================================================ */

async function ensureAuthor(author) {
  const existing = await client.query(
    `
      SELECT id
      FROM authors
      WHERE slug = $1
      LIMIT 1
    `,
    [author.slug],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO authors (
        "firstName",
        "lastName",
        slug,
        birthdate,
        deathdate,
        biography,
        "countryOfBirth",
        "photoUrl",
        "isActive"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      )
      RETURNING id
    `,
    [
      author.firstName,
      author.lastName,
      author.slug,
      author.birthdate,
      author.deathdate,
      author.biography,
      author.countryOfBirth,
      author.photoUrl,
      author.isActive,
    ],
  );

  return result.rows[0].id;
}

/* ============================================================
   PUBLISHERS
   ============================================================ */

async function ensurePublisher(publisher) {
  const existing = await client.query(
    `
      SELECT id
      FROM publishers
      WHERE slug = $1
      LIMIT 1
    `,
    [publisher.slug],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO publishers (
        name,
        slug,
        description,
        "logoUrl",
        "websiteUrl",
        country,
        "isActive"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
      RETURNING id
    `,
    [
      publisher.name,
      publisher.slug,
      publisher.description,
      publisher.logoUrl,
      publisher.websiteUrl,
      publisher.country,
      publisher.isActive,
    ],
  );

  return result.rows[0].id;
}

/* ============================================================
   COLLECTIONS
   ============================================================ */

async function ensureCollection(collection, publisherId) {
  const existing = await client.query(
    `
      SELECT id
      FROM collections
      WHERE slug = $1
      LIMIT 1
    `,
    [collection.slug],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO collections (
        name,
        slug,
        description,
        "coverImageUrl",
        "isActive",
        "publisherId"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      )
      RETURNING id
    `,
    [
      collection.name,
      collection.slug,
      collection.description,
      collection.coverImageUrl,
      collection.isActive,
      publisherId,
    ],
  );

  return result.rows[0].id;
}

/* ============================================================
   GENRES
   ============================================================ */

async function ensureGenre(genre) {
  const existing = await client.query(
    `
      SELECT id
      FROM genres
      WHERE slug = $1
      LIMIT 1
    `,
    [genre.slug],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO genres (
        name,
        slug,
        description,
        "isActive"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING id
    `,
    [genre.name, genre.slug, genre.description, genre.isActive],
  );

  return result.rows[0].id;
}

/* ============================================================
   USERS
   ============================================================ */

async function ensureUser(user, roleValue, statusValue) {
  const existing = await client.query(
    `
      SELECT id
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [user.email],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO users (
        "firstName",
        "lastName",
        email,
        password,
        phone,
        "avatarUrl",
        "isEmailVerified",
        role,
        status
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      )
      RETURNING id
    `,
    [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.phone,
      user.avatarUrl,
      user.isEmailVerified,
      roleValue,
      statusValue,
    ],
  );

  return result.rows[0].id;
}

/* ============================================================
   USER ADDRESSES
   ============================================================ */

async function ensureUserAddress(address, userId) {
  /*
   * La entidad no define un unique constraint sobre (userId, alias),
   * pero lo usamos como llave de idempotencia a nivel de aplicación
   * para que el seed sea seguro de re-ejecutar.
   */
  const existing = await client.query(
    `
      SELECT id
      FROM user_addresses
      WHERE "userId" = $1
        AND alias = $2
      LIMIT 1
    `,
    [userId, address.alias],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO user_addresses (
        "userId",
        alias,
        "streetAddress",
        "apartmentOrSuite",
        city,
        state,
        "postalCode",
        country,
        "isDefault"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      )
      RETURNING id
    `,
    [
      userId,
      address.alias,
      address.streetAddress,
      address.apartmentOrSuite,
      address.city,
      address.state,
      address.postalCode,
      address.country,
      address.isDefault,
    ],
  );

  return result.rows[0].id;
}

/* ============================================================
   BOOKS
   ============================================================ */

async function ensureBook(book, references) {
  const existingBySlug = await client.query(
    `
      SELECT id
      FROM books
      WHERE slug = $1
      LIMIT 1
    `,
    [book.slug],
  );

  if (existingBySlug.rows.length > 0) {
    return existingBySlug.rows[0].id;
  }

  /*
   * ISBN es UNIQUE.
   * Antes de insertar verificamos si ya existe.
   */
  if (book.isbn) {
    const existingByIsbn = await client.query(
      `
        SELECT id
        FROM books
        WHERE isbn = $1
        LIMIT 1
      `,
      [book.isbn],
    );

    if (existingByIsbn.rows.length > 0) {
      return existingByIsbn.rows[0].id;
    }
  }

  const result = await client.query(
    `
      INSERT INTO books (
        title,
        slug,
        description,
        price,
        "discountPrice",
        stock,
        isbn,
        format,
        "coverImageUrl",
        pages,
        "publishedYear",
        language,
        "weightInGrams",
        status,
        "categoryId",
        "authorId",
        "publisherId",
        "collectionId"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18
      )
      RETURNING id
    `,
    [
      book.title,
      book.slug,
      book.description,
      book.price,
      book.discountPrice,
      book.stock,
      book.isbn,
      book.format,
      book.coverImageUrl,
      book.pages,
      book.publishedYear,
      book.language,
      book.weightInGrams,
      book.status,
      references.categoryId,
      references.authorId,
      references.publisherId,
      references.collectionId,
    ],
  );

  return result.rows[0].id;
}

/* ============================================================
   BOOK REVIEWS
   ============================================================ */

async function ensureBookReview(review, bookId, userId) {
  const existing = await client.query(
    `
      SELECT id
      FROM book_reviews
      WHERE "bookId" = $1
        AND "userId" = $2
      LIMIT 1
    `,
    [bookId, userId],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO book_reviews (
        "bookId",
        "userId",
        rating,
        title,
        comment,
        "isApproved",
        "isVerifiedPurchase",
        "helpfulVotes"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
      )
      RETURNING id
    `,
    [
      bookId,
      userId,
      review.rating,
      review.title,
      review.comment,
      review.isApproved,
      review.isVerifiedPurchase,
      review.helpfulVotes,
    ],
  );

  return result.rows[0].id;
}

/* ============================================================
   WISHLISTS
   ============================================================ */

async function ensureWishlist(wishlist, userId) {
  const existing = await client.query(
    `
      SELECT id
      FROM wishlists
      WHERE "userId" = $1
        AND name = $2
      LIMIT 1
    `,
    [userId, wishlist.name],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO wishlists (
        "userId",
        name,
        "isMain",
        "isPublic"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING id
    `,
    [userId, wishlist.name, wishlist.isMain, wishlist.isPublic],
  );

  return result.rows[0].id;
}

/* ============================================================
   WISHLIST ITEMS
   ============================================================ */

async function ensureWishlistItem(wishlistId, bookId) {
  const existing = await client.query(
    `
      SELECT id
      FROM wishlist_items
      WHERE "wishlistId" = $1
        AND "bookId" = $2
      LIMIT 1
    `,
    [wishlistId, bookId],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO wishlist_items (
        "wishlistId",
        "bookId"
      )
      VALUES (
        $1,
        $2
      )
      RETURNING id
    `,
    [wishlistId, bookId],
  );

  return result.rows[0].id;
}

/* ============================================================
   ORDERS
   ============================================================ */

async function ensureOrder(order, userId, statusValue) {
  const existing = await client.query(
    `
      SELECT id
      FROM orders
      WHERE "orderNumber" = $1
      LIMIT 1
    `,
    [order.orderNumber],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO orders (
        "orderNumber",
        "userId",
        status,
        subtotal,
        "shippingCost",
        "taxAmount",
        "discountAmount",
        "totalAmount",
        "shippingAddressSnapshot",
        "trackingNumber",
        "shippingCarrier"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
      )
      RETURNING id
    `,
    [
      order.orderNumber,
      userId,
      statusValue,
      order.subtotal,
      order.shippingCost,
      order.taxAmount,
      order.discountAmount,
      order.totalAmount,
      JSON.stringify(order.shippingAddressSnapshot),
      order.trackingNumber,
      order.shippingCarrier,
    ],
  );

  return result.rows[0].id;
}

/* ============================================================
   ORDER ITEMS
   ============================================================ */

async function ensureOrderItem(orderId, bookId, quantity, priceAtPurchase) {
  /*
   * No hay unique constraint sobre (orderId, bookId), pero lo usamos
   * como llave de idempotencia a nivel de aplicación para el seed.
   */
  const existing = await client.query(
    `
      SELECT id
      FROM order_items
      WHERE "orderId" = $1
        AND "bookId" = $2
      LIMIT 1
    `,
    [orderId, bookId],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const totalPrice = Number((priceAtPurchase * quantity).toFixed(2));

  const result = await client.query(
    `
      INSERT INTO order_items (
        "orderId",
        "bookId",
        quantity,
        "priceAtPurchase",
        "totalPrice"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
      )
      RETURNING id
    `,
    [orderId, bookId, quantity, priceAtPurchase, totalPrice],
  );

  return result.rows[0].id;
}

/* ============================================================
   CARTS
   ============================================================ */

async function ensureCart(cart, userId) {
  /*
   * Un carrito de usuario registrado se identifica por userId (unique).
   * Un carrito de invitado (sin userId) se identifica por sessionToken.
   */
  const existing = userId
    ? await client.query(
        `
          SELECT id
          FROM carts
          WHERE "userId" = $1
          LIMIT 1
        `,
        [userId],
      )
    : await client.query(
        `
          SELECT id
          FROM carts
          WHERE "sessionToken" = $1
          LIMIT 1
        `,
        [cart.sessionToken],
      );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO carts (
        "userId",
        "sessionToken"
      )
      VALUES (
        $1,
        $2
      )
      RETURNING id
    `,
    [userId, cart.sessionToken],
  );

  return result.rows[0].id;
}

/* ============================================================
   CART ITEMS
   ============================================================ */

async function ensureCartItem(cartId, bookId, quantity) {
  const existing = await client.query(
    `
      SELECT id
      FROM cart_items
      WHERE "cartId" = $1
        AND "bookId" = $2
      LIMIT 1
    `,
    [cartId, bookId],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `
      INSERT INTO cart_items (
        "cartId",
        "bookId",
        quantity
      )
      VALUES (
        $1,
        $2,
        $3
      )
      RETURNING id
    `,
    [cartId, bookId, quantity],
  );

  return result.rows[0].id;
}

/* ============================================================
   SEED DATA - CATEGORIES
   ============================================================ */

const categories = [
  {
    name: 'Political fiction',
    slug: 'political-fiction',
    description: 'Novelas relacionadas con política y sociedad.',
  },
  {
    name: 'Fantasy',
    slug: 'fantasy',
    description: 'Historias de fantasía y mundos imaginarios.',
  },
  {
    name: 'Fiction',
    slug: 'fiction',
    description: 'Obras de ficción general.',
  },
  {
    name: 'Juvenile fiction',
    slug: 'juvenile-fiction',
    description: 'Ficción dirigida principalmente al público juvenil.',
  },
  {
    name: 'Horror',
    slug: 'horror',
    description: 'Historias de terror y horror.',
  },
  {
    name: "Children's stories",
    slug: 'childrens-stories',
    description: 'Historias y literatura infantil.',
  },
  {
    name: 'Adventure fiction',
    slug: 'adventure-fiction',
    description: 'Historias de aventura.',
  },
];

/* ============================================================
   SEED DATA - AUTHORS
   ============================================================ */

const authors = [
  {
    firstName: 'Jack',
    lastName: 'London',
    slug: 'jack-london',
    birthdate: '1876-01-12',
    deathdate: '1916-11-22',
    biography: 'Escritor estadounidense conocido por sus novelas y relatos de aventura.',
    countryOfBirth: 'United States',
    photoUrl: null,
    isActive: true,
  },
  {
    firstName: 'George',
    lastName: 'Orwell',
    slug: 'george-orwell',
    birthdate: '1903-06-25',
    deathdate: '1950-01-21',
    biography: 'Escritor y periodista británico conocido por sus novelas distópicas y ensayos.',
    countryOfBirth: 'India',
    photoUrl: null,
    isActive: true,
  },
  {
    firstName: 'Mary',
    lastName: 'Shelley',
    slug: 'mary-shelley',
    birthdate: '1797-08-30',
    deathdate: '1851-02-01',
    biography: 'Escritora británica considerada una de las precursoras de la ciencia ficción.',
    countryOfBirth: 'United Kingdom',
    photoUrl: null,
    isActive: true,
  },
  {
    firstName: 'J. R. R.',
    lastName: 'Tolkien',
    slug: 'j-r-r-tolkien',
    birthdate: '1892-01-03',
    deathdate: '1973-09-02',
    biography: 'Escritor y filólogo británico conocido por sus obras de fantasía.',
    countryOfBirth: 'South Africa',
    photoUrl: null,
    isActive: true,
  },
];

/* ============================================================
   SEED DATA - PUBLISHERS
   ============================================================ */

const publishers = [
  {
    name: 'Open Library',
    slug: 'open-library',
    description: 'Fuente de referencia para libros.',
    logoUrl: null,
    websiteUrl: 'https://openlibrary.org',
    country: 'United States',
    isActive: true,
  },
  {
    name: 'Penguin Classics',
    slug: 'penguin-classics',
    description: 'Colección editorial dedicada a clásicos de la literatura.',
    logoUrl: null,
    websiteUrl: null,
    country: 'United Kingdom',
    isActive: true,
  },
  {
    name: 'Vintage Classics',
    slug: 'vintage-classics',
    description: 'Sello editorial especializado en reediciones de literatura clásica.',
    logoUrl: null,
    websiteUrl: null,
    country: 'United Kingdom',
    isActive: true,
  },
  {
    name: 'HarperCollins',
    slug: 'harpercollins',
    description: 'Editorial internacional con catálogo en múltiples géneros.',
    logoUrl: null,
    websiteUrl: 'https://www.harpercollins.com',
    country: 'United States',
    isActive: true,
  },
];

/* ============================================================
   SEED DATA - COLLECTIONS
   ============================================================ */

const collections = [
  {
    name: 'Classic Literature',
    slug: 'classic-literature',
    description: 'Colección de clásicos de la literatura.',
    coverImageUrl: null,
    publisherSlug: 'penguin-classics',
    isActive: true,
  },
  {
    name: 'Adventure Classics',
    slug: 'adventure-classics',
    description: 'Colección de clásicos de aventura.',
    coverImageUrl: null,
    publisherSlug: 'penguin-classics',
    isActive: true,
  },
];

/* ============================================================
   SEED DATA - GENRES
   ============================================================ */

const genres = [
  {
    name: 'Ciencia Ficción',
    slug: 'ciencia-ficcion',
    description:
      'Historias ambientadas en futuros especulativos, tecnología avanzada o viajes espaciales.',
    isActive: true,
  },
  {
    name: 'Terror',
    slug: 'terror',
    description: 'Relatos diseñados para generar miedo, suspenso o inquietud en el lector.',
    isActive: true,
  },
  {
    name: 'Distopía',
    slug: 'distopia',
    description: 'Ficción que retrata sociedades opresivas o futuros indeseables.',
    isActive: true,
  },
  {
    name: 'Fantasía Épica',
    slug: 'fantasia-epica',
    description: 'Aventuras en mundos imaginarios con magia, criaturas y grandes conflictos.',
    isActive: true,
  },
  {
    name: 'Aventura',
    slug: 'aventura',
    description: 'Historias centradas en viajes, exploración y desafíos físicos.',
    isActive: true,
  },
];

/* ============================================================
   SEED DATA - USERS
   ============================================================ */

/*
 * IMPORTANTE: estos valores de "password" son placeholders con formato
 * de hash bcrypt, pero NO son hashes reales. Reemplázalos por hashes
 * generados de verdad (bcrypt/argon2) antes de usar estos usuarios
 * para iniciar sesión en cualquier ambiente real.
 */
const users = [
  {
    firstName: 'Ana',
    lastName: 'Torres',
    email: 'ana.torres@example.com',
    password: '$2b$10$REEMPLAZAR.ESTE.HASH.CON.UNO.REAL.0000000000000000000',
    phone: '+57 300 000 0001',
    avatarUrl: null,
    isEmailVerified: true,
  },
  {
    firstName: 'Carlos',
    lastName: 'Ramírez',
    email: 'carlos.ramirez@example.com',
    password: '$2b$10$REEMPLAZAR.ESTE.HASH.CON.UNO.REAL.0000000000000000001',
    phone: '+57 300 000 0002',
    avatarUrl: null,
    isEmailVerified: true,
  },
  {
    firstName: 'Lucía',
    lastName: 'Fernández',
    email: 'lucia.fernandez@example.com',
    password: '$2b$10$REEMPLAZAR.ESTE.HASH.CON.UNO.REAL.0000000000000000002',
    phone: null,
    avatarUrl: null,
    isEmailVerified: false,
  },
];

/* ============================================================
   SEED DATA - USER ADDRESSES
   ============================================================ */

const userAddresses = [
  {
    userEmail: 'ana.torres@example.com',
    alias: 'Casa',
    streetAddress: 'Calle 10 # 43-12',
    apartmentOrSuite: 'Apto 502',
    city: 'Medellín',
    state: 'Antioquia',
    postalCode: '050021',
    country: 'Colombia',
    isDefault: true,
  },
  {
    userEmail: 'ana.torres@example.com',
    alias: 'Oficina',
    streetAddress: 'Carrera 43A # 1-50',
    apartmentOrSuite: 'Piso 8',
    city: 'Medellín',
    state: 'Antioquia',
    postalCode: '050022',
    country: 'Colombia',
    isDefault: false,
  },
  {
    userEmail: 'carlos.ramirez@example.com',
    alias: 'Casa',
    streetAddress: 'Avenida 68 # 25-30',
    apartmentOrSuite: null,
    city: 'Bogotá',
    state: 'Cundinamarca',
    postalCode: '111611',
    country: 'Colombia',
    isDefault: true,
  },
  {
    userEmail: 'lucia.fernandez@example.com',
    alias: 'Casa',
    streetAddress: 'Calle 5 # 38-20',
    apartmentOrSuite: null,
    city: 'Cali',
    state: 'Valle del Cauca',
    postalCode: '760001',
    country: 'Colombia',
    isDefault: true,
  },
];

/* ============================================================
   SEED DATA - BOOKS
   ============================================================ */

const books = [
  {
    title: 'The Iron Heel',
    slug: 'the-iron-heel',
    description: 'Novela distópica de Jack London sobre una sociedad dominada por una oligarquía.',
    price: 45000,
    discountPrice: 39900,
    stock: 15,
    isbn: '9780000000001',
    coverImageUrl: null,
    pages: 320,
    publishedYear: 1908,
    language: 'en',
    weightInGrams: 450,
    authorSlug: 'jack-london',
    categorySlug: 'political-fiction',
    publisherSlug: 'open-library',
    collectionSlug: 'classic-literature',
  },
  {
    title: 'The Call of the Wild',
    slug: 'the-call-of-the-wild',
    description: 'Novela de aventura protagonizada por un perro llamado Buck.',
    price: 42000,
    discountPrice: 37900,
    stock: 20,
    isbn: '9780000000002',
    coverImageUrl: null,
    pages: 172,
    publishedYear: 1903,
    language: 'en',
    weightInGrams: 300,
    authorSlug: 'jack-london',
    categorySlug: 'adventure-fiction',
    publisherSlug: 'penguin-classics',
    collectionSlug: 'adventure-classics',
  },
  {
    title: 'Animal Farm',
    slug: 'animal-farm',
    description: 'Fábula política de George Orwell sobre una sociedad de animales.',
    price: 39000,
    discountPrice: 34900,
    stock: 25,
    isbn: '9780000000003',
    coverImageUrl: null,
    pages: 144,
    publishedYear: 1945,
    language: 'en',
    weightInGrams: 250,
    authorSlug: 'george-orwell',
    categorySlug: 'political-fiction',
    publisherSlug: 'penguin-classics',
    collectionSlug: 'classic-literature',
  },
  {
    title: 'Nineteen Eighty-Four',
    slug: 'nineteen-eighty-four',
    description: 'Novela distópica de George Orwell ambientada en una sociedad bajo vigilancia.',
    price: 48000,
    discountPrice: 42900,
    stock: 18,
    isbn: '9780000000004',
    coverImageUrl: null,
    pages: 328,
    publishedYear: 1949,
    language: 'en',
    weightInGrams: 430,
    authorSlug: 'george-orwell',
    categorySlug: 'political-fiction',
    publisherSlug: 'penguin-classics',
    collectionSlug: 'classic-literature',
  },
  {
    title: 'Frankenstein',
    slug: 'frankenstein',
    description:
      'Clásico de Mary Shelley sobre la creación de una criatura por parte del científico Victor Frankenstein.',
    price: 44000,
    discountPrice: 39900,
    stock: 22,
    isbn: '9780000000005',
    coverImageUrl: null,
    pages: 280,
    publishedYear: 1818,
    language: 'en',
    weightInGrams: 400,
    authorSlug: 'mary-shelley',
    categorySlug: 'horror',
    publisherSlug: 'penguin-classics',
    collectionSlug: 'classic-literature',
  },
  {
    title: 'The Hobbit',
    slug: 'the-hobbit',
    description: 'Novela de fantasía de J. R. R. Tolkien protagonizada por Bilbo Bolsón.',
    price: 52000,
    discountPrice: 46900,
    stock: 16,
    isbn: '9780000000006',
    coverImageUrl: null,
    pages: 310,
    publishedYear: 1937,
    language: 'en',
    weightInGrams: 470,
    authorSlug: 'j-r-r-tolkien',
    categorySlug: 'fantasy',
    publisherSlug: 'penguin-classics',
    collectionSlug: 'classic-literature',
  },
];

/* ============================================================
   SEED DATA - BOOK REVIEWS
   ============================================================ */

const bookReviews = [
  {
    bookSlug: 'the-hobbit',
    userEmail: 'ana.torres@example.com',
    rating: 5,
    title: 'Una aventura inolvidable',
    comment:
      'Bilbo evoluciona de una forma que engancha desde el primer capítulo. Ideal para empezar con Tolkien.',
    isApproved: true,
    isVerifiedPurchase: true,
    helpfulVotes: 12,
  },
  {
    bookSlug: 'nineteen-eighty-four',
    userEmail: 'carlos.ramirez@example.com',
    rating: 5,
    title: 'Vigente hoy más que nunca',
    comment:
      'La vigilancia y el control del lenguaje que describe Orwell siguen resonando muchísimo.',
    isApproved: true,
    isVerifiedPurchase: true,
    helpfulVotes: 34,
  },
  {
    bookSlug: 'the-call-of-the-wild',
    userEmail: 'lucia.fernandez@example.com',
    rating: 4,
    title: 'Cruda y hermosa',
    comment: 'La transformación de Buck es dura de leer en partes, pero está muy bien narrada.',
    isApproved: false,
    isVerifiedPurchase: false,
    helpfulVotes: 0,
  },
];

/* ============================================================
   SEED DATA - WISHLISTS
   ============================================================ */

const wishlists = [
  {
    userEmail: 'ana.torres@example.com',
    name: 'Favoritos',
    isMain: true,
    isPublic: false,
    bookSlugs: ['the-hobbit', 'frankenstein'],
  },
  {
    userEmail: 'ana.torres@example.com',
    name: 'Para leer en vacaciones',
    isMain: false,
    isPublic: true,
    bookSlugs: ['animal-farm'],
  },
  {
    userEmail: 'carlos.ramirez@example.com',
    name: 'Favoritos',
    isMain: true,
    isPublic: false,
    bookSlugs: ['nineteen-eighty-four', 'the-iron-heel'],
  },
  {
    userEmail: 'lucia.fernandez@example.com',
    name: 'Favoritos',
    isMain: true,
    isPublic: false,
    bookSlugs: ['the-call-of-the-wild'],
  },
];

/* ============================================================
   SEED DATA - ORDERS
   ============================================================ */

const orders = [
  {
    orderNumber: 'ORD-2026-00001',
    userEmail: 'ana.torres@example.com',
    addressAlias: 'Casa',
    shippingCost: 8000,
    taxAmount: 0,
    discountAmount: 0,
    trackingNumber: null,
    shippingCarrier: null,
    items: [
      { bookSlug: 'the-hobbit', quantity: 1 },
      { bookSlug: 'frankenstein', quantity: 1 },
    ],
  },
  {
    orderNumber: 'ORD-2026-00002',
    userEmail: 'carlos.ramirez@example.com',
    addressAlias: 'Casa',
    shippingCost: 8000,
    taxAmount: 0,
    discountAmount: 5000,
    trackingNumber: 'SVE123456789CO',
    shippingCarrier: 'Servientrega',
    items: [{ bookSlug: 'nineteen-eighty-four', quantity: 2 }],
  },
];

/* ============================================================
   SEED DATA - CARTS
   ============================================================ */

const carts = [
  {
    userEmail: 'ana.torres@example.com',
    sessionToken: null,
    items: [
      { bookSlug: 'the-call-of-the-wild', quantity: 1 },
      { bookSlug: 'animal-farm', quantity: 2 },
    ],
  },
  {
    userEmail: 'carlos.ramirez@example.com',
    sessionToken: null,
    items: [{ bookSlug: 'frankenstein', quantity: 1 }],
  },
  {
    userEmail: 'lucia.fernandez@example.com',
    sessionToken: null,
    items: [{ bookSlug: 'the-iron-heel', quantity: 1 }],
  },
  {
    // Carrito de invitado: sin usuario registrado, identificado por sessionToken
    userEmail: null,
    sessionToken: 'guest-9f3e2b1c4a7d4e6f9b3c8a1d2e5f0abc',
    items: [{ bookSlug: 'the-hobbit', quantity: 1 }],
  },
];

/* ============================================================
   MAIN
   ============================================================ */

async function main() {
  console.log('Starting database seed...');

  try {
    await client.connect();

    console.log('Database connected.');

    /* --------------------------------------------------------
       VERIFY TABLES
       -------------------------------------------------------- */

    const requiredTables = [
      'categories',
      'authors',
      'publishers',
      'collections',
      'genres',
      'users',
      'user_addresses',
      'books',
      'book_reviews',
      'wishlists',
      'wishlist_items',
      'orders',
      'order_items',
      'carts',
      'cart_items',
    ];

    for (const tableName of requiredTables) {
      const exists = await tableExists(tableName);

      if (!exists) {
        throw new Error(`La tabla "${tableName}" no existe. Ejecuta primero las migraciones.`);
      }
    }

    /* --------------------------------------------------------
       VERIFY CATEGORY COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('categories', ['name', 'slug', 'description', 'status']);

    /* --------------------------------------------------------
       VERIFY AUTHOR COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('authors', [
      'firstName',
      'lastName',
      'slug',
      'birthdate',
      'deathdate',
      'biography',
      'countryOfBirth',
      'photoUrl',
      'isActive',
    ]);

    /* --------------------------------------------------------
       VERIFY PUBLISHER COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('publishers', [
      'name',
      'slug',
      'description',
      'logoUrl',
      'websiteUrl',
      'country',
      'isActive',
    ]);

    /* --------------------------------------------------------
       VERIFY COLLECTION COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('collections', [
      'name',
      'slug',
      'description',
      'coverImageUrl',
      'isActive',
      'publisherId',
    ]);

    /* --------------------------------------------------------
       VERIFY GENRE COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('genres', ['name', 'slug', 'description', 'isActive']);

    /* --------------------------------------------------------
       VERIFY USER COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('users', [
      'firstName',
      'lastName',
      'email',
      'password',
      'phone',
      'avatarUrl',
      'isEmailVerified',
      'role',
      'status',
    ]);

    /* --------------------------------------------------------
       VERIFY USER ADDRESS COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('user_addresses', [
      'userId',
      'alias',
      'streetAddress',
      'apartmentOrSuite',
      'city',
      'state',
      'postalCode',
      'country',
      'isDefault',
    ]);

    /* --------------------------------------------------------
       VERIFY BOOK COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('books', [
      'title',
      'slug',
      'description',
      'price',
      'discountPrice',
      'stock',
      'isbn',
      'format',
      'coverImageUrl',
      'pages',
      'publishedYear',
      'language',
      'weightInGrams',
      'status',
      'categoryId',
      'authorId',
      'publisherId',
      'collectionId',
    ]);

    /* --------------------------------------------------------
       VERIFY BOOK REVIEW COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('book_reviews', [
      'bookId',
      'userId',
      'rating',
      'title',
      'comment',
      'isApproved',
      'isVerifiedPurchase',
      'helpfulVotes',
    ]);

    /* --------------------------------------------------------
       VERIFY WISHLIST COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('wishlists', ['userId', 'name', 'isMain', 'isPublic']);

    /* --------------------------------------------------------
       VERIFY WISHLIST ITEM COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('wishlist_items', ['wishlistId', 'bookId']);

    /* --------------------------------------------------------
       VERIFY ORDER COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('orders', [
      'orderNumber',
      'userId',
      'status',
      'subtotal',
      'shippingCost',
      'taxAmount',
      'discountAmount',
      'totalAmount',
      'shippingAddressSnapshot',
      'trackingNumber',
      'shippingCarrier',
    ]);

    /* --------------------------------------------------------
       VERIFY ORDER ITEM COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('order_items', [
      'orderId',
      'bookId',
      'quantity',
      'priceAtPurchase',
      'totalPrice',
    ]);

    /* --------------------------------------------------------
       VERIFY CART COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('carts', ['userId', 'sessionToken']);

    /* --------------------------------------------------------
       VERIFY CART ITEM COLUMNS
       -------------------------------------------------------- */

    await assertRequiredColumns('cart_items', ['cartId', 'bookId', 'quantity']);

    /* --------------------------------------------------------
       RESOLVE ENUMS DIRECTLY FROM POSTGRESQL
       -------------------------------------------------------- */

    const categoryStatusEnumName = await getColumnEnumName('categories', 'status');

    const bookStatusEnumName = await getColumnEnumName('books', 'status');

    const bookFormatEnumName = await getColumnEnumName('books', 'format');

    const userRoleEnumName = await getColumnEnumName('users', 'role');

    const userStatusEnumName = await getColumnEnumName('users', 'status');

    const orderStatusEnumName = await getColumnEnumName('orders', 'status');

    const categoryStatusValues = await getEnumValues(categoryStatusEnumName);

    const bookStatusValues = await getEnumValues(bookStatusEnumName);

    const bookFormatValues = await getEnumValues(bookFormatEnumName);

    const userRoleValues = await getEnumValues(userRoleEnumName);

    const userStatusValues = await getEnumValues(userStatusEnumName);

    const orderStatusValues = await getEnumValues(orderStatusEnumName);

    const activeCategoryStatus = findEnumValue(categoryStatusValues, 'active');

    const activeBookStatus = findEnumValue(bookStatusValues, 'active');

    const paperbackFormat = findEnumValue(bookFormatValues, 'paperback');

    const defaultUserRole = findEnumValue(userRoleValues, 'user');

    const activeUserStatus = findEnumValue(userStatusValues, 'active');

    const pendingOrderStatus = findEnumValue(orderStatusValues, 'pending');

    console.log('');
    console.log(`Category status enum: ${categoryStatusValues.join(', ')}`);

    console.log(`Book status enum: ${bookStatusValues.join(', ')}`);

    console.log(`Book format enum: ${bookFormatValues.join(', ')}`);

    console.log(`User role enum: ${userRoleValues.join(', ')}`);

    console.log(`User status enum: ${userStatusValues.join(', ')}`);

    console.log(`Order status enum: ${orderStatusValues.join(', ')}`);

    /* --------------------------------------------------------
       BEGIN TRANSACTION
       -------------------------------------------------------- */

    await client.query('BEGIN');

    const categoryIds = {};
    const authorIds = {};
    const publisherIds = {};
    const collectionIds = {};
    const genreIds = {};
    const userIds = {};
    const bookIds = {};

    /* --------------------------------------------------------
       CATEGORIES
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding categories...');

    for (const category of categories) {
      categoryIds[category.slug] = await ensureCategory(category, activeCategoryStatus);

      console.log(`  Category: ${category.name} -> ${categoryIds[category.slug]}`);
    }

    /* --------------------------------------------------------
       AUTHORS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding authors...');

    for (const author of authors) {
      authorIds[author.slug] = await ensureAuthor(author);

      console.log(`  Author: ${author.firstName} ${author.lastName} -> ${authorIds[author.slug]}`);
    }

    /* --------------------------------------------------------
       PUBLISHERS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding publishers...');

    for (const publisher of publishers) {
      publisherIds[publisher.slug] = await ensurePublisher(publisher);

      console.log(`  Publisher: ${publisher.name} -> ${publisherIds[publisher.slug]}`);
    }

    /* --------------------------------------------------------
       COLLECTIONS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding collections...');

    for (const collection of collections) {
      const publisherId = publisherIds[collection.publisherSlug];

      if (!publisherId) {
        throw new Error(
          `No existe el publisher "${collection.publisherSlug}" para la colección "${collection.name}".`,
        );
      }

      collectionIds[collection.slug] = await ensureCollection(collection, publisherId);

      console.log(`  Collection: ${collection.name} -> ${collectionIds[collection.slug]}`);
    }

    /* --------------------------------------------------------
       GENRES
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding genres...');

    for (const genre of genres) {
      genreIds[genre.slug] = await ensureGenre(genre);

      console.log(`  Genre: ${genre.name} -> ${genreIds[genre.slug]}`);
    }

    /* --------------------------------------------------------
       USERS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding users...');

    for (const user of users) {
      userIds[user.email] = await ensureUser(user, defaultUserRole, activeUserStatus);

      console.log(`  User: ${user.firstName} ${user.lastName} -> ${userIds[user.email]}`);
    }

    /* --------------------------------------------------------
       USER ADDRESSES
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding user addresses...');

    for (const address of userAddresses) {
      const userId = userIds[address.userEmail];

      if (!userId) {
        throw new Error(
          `No existe el usuario "${address.userEmail}" para la dirección "${address.alias}".`,
        );
      }

      const addressId = await ensureUserAddress(address, userId);

      console.log(`  Address: ${address.userEmail} / ${address.alias} -> ${addressId}`);
    }

    /* --------------------------------------------------------
       BOOKS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding books...');

    for (const book of books) {
      const categoryId = categoryIds[book.categorySlug];

      const authorId = authorIds[book.authorSlug];

      const publisherId = publisherIds[book.publisherSlug];

      const collectionId = collectionIds[book.collectionSlug];

      if (!categoryId) {
        throw new Error(
          `No existe la categoría "${book.categorySlug}" para el libro "${book.title}".`,
        );
      }

      if (!authorId) {
        throw new Error(`No existe el autor "${book.authorSlug}" para el libro "${book.title}".`);
      }

      if (!publisherId) {
        throw new Error(
          `No existe el publisher "${book.publisherSlug}" para el libro "${book.title}".`,
        );
      }

      if (!collectionId) {
        throw new Error(
          `No existe la colección "${book.collectionSlug}" para el libro "${book.title}".`,
        );
      }

      const bookId = await ensureBook(
        {
          ...book,
          format: paperbackFormat,
          status: activeBookStatus,
        },
        {
          categoryId,
          authorId,
          publisherId,
          collectionId,
        },
      );

      bookIds[book.slug] = bookId;

      console.log(`  Book: ${book.title} -> ${bookId}`);
    }

    /* --------------------------------------------------------
       BOOK REVIEWS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding book reviews...');

    for (const review of bookReviews) {
      const bookId = bookIds[review.bookSlug];

      const userId = userIds[review.userEmail];

      if (!bookId) {
        throw new Error(`No existe el libro "${review.bookSlug}" para la reseña.`);
      }

      if (!userId) {
        throw new Error(`No existe el usuario "${review.userEmail}" para la reseña.`);
      }

      const reviewId = await ensureBookReview(review, bookId, userId);

      console.log(`  Review: ${review.userEmail} -> ${review.bookSlug} (${reviewId})`);
    }

    /* --------------------------------------------------------
       WISHLISTS + WISHLIST ITEMS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding wishlists...');

    for (const wishlist of wishlists) {
      const userId = userIds[wishlist.userEmail];

      if (!userId) {
        throw new Error(
          `No existe el usuario "${wishlist.userEmail}" para la wishlist "${wishlist.name}".`,
        );
      }

      const wishlistId = await ensureWishlist(wishlist, userId);

      console.log(`  Wishlist: ${wishlist.userEmail} / ${wishlist.name} -> ${wishlistId}`);

      for (const bookSlug of wishlist.bookSlugs) {
        const bookId = bookIds[bookSlug];

        if (!bookId) {
          throw new Error(`No existe el libro "${bookSlug}" para la wishlist "${wishlist.name}".`);
        }

        await ensureWishlistItem(wishlistId, bookId);

        console.log(`    + ${bookSlug}`);
      }
    }

    /* --------------------------------------------------------
       ORDERS + ORDER ITEMS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding orders...');

    for (const order of orders) {
      const userId = userIds[order.userEmail];

      if (!userId) {
        throw new Error(
          `No existe el usuario "${order.userEmail}" para la orden "${order.orderNumber}".`,
        );
      }

      const user = users.find((candidate) => candidate.email === order.userEmail);

      const address = userAddresses.find(
        (candidate) =>
          candidate.userEmail === order.userEmail && candidate.alias === order.addressAlias,
      );

      if (!address) {
        throw new Error(
          `No existe la dirección "${order.addressAlias}" de "${order.userEmail}" para la orden "${order.orderNumber}".`,
        );
      }

      let subtotal = 0;

      const resolvedItems = [];

      for (const item of order.items) {
        const bookData = books.find((candidate) => candidate.slug === item.bookSlug);

        const bookId = bookIds[item.bookSlug];

        if (!bookData || !bookId) {
          throw new Error(
            `No existe el libro "${item.bookSlug}" para la orden "${order.orderNumber}".`,
          );
        }

        const priceAtPurchase = bookData.discountPrice;

        subtotal += priceAtPurchase * item.quantity;

        resolvedItems.push({ bookId, quantity: item.quantity, priceAtPurchase });
      }

      const totalAmount = subtotal + order.shippingCost + order.taxAmount - order.discountAmount;

      const orderId = await ensureOrder(
        {
          orderNumber: order.orderNumber,
          subtotal,
          shippingCost: order.shippingCost,
          taxAmount: order.taxAmount,
          discountAmount: order.discountAmount,
          totalAmount,
          shippingAddressSnapshot: {
            alias: address.alias,
            streetAddress: address.streetAddress,
            apartmentOrSuite: address.apartmentOrSuite,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
            recipientName: `${user.firstName} ${user.lastName}`,
            recipientPhone: user.phone,
          },
          trackingNumber: order.trackingNumber,
          shippingCarrier: order.shippingCarrier,
        },
        userId,
        pendingOrderStatus,
      );

      console.log(`  Order: ${order.orderNumber} -> ${orderId} (total: ${totalAmount})`);

      for (const item of resolvedItems) {
        await ensureOrderItem(orderId, item.bookId, item.quantity, item.priceAtPurchase);

        console.log(`    + ${item.quantity} x book#${item.bookId} @ ${item.priceAtPurchase}`);
      }
    }

    /* --------------------------------------------------------
       CARTS + CART ITEMS
       -------------------------------------------------------- */

    console.log('');
    console.log('Seeding carts...');

    for (const cart of carts) {
      const userId = cart.userEmail ? userIds[cart.userEmail] : null;

      if (cart.userEmail && !userId) {
        throw new Error(`No existe el usuario "${cart.userEmail}" para el carrito.`);
      }

      const cartId = await ensureCart(cart, userId);

      console.log(`  Cart: ${cart.userEmail || cart.sessionToken} -> ${cartId}`);

      for (const item of cart.items) {
        const bookId = bookIds[item.bookSlug];

        if (!bookId) {
          throw new Error(`No existe el libro "${item.bookSlug}" para el carrito.`);
        }

        await ensureCartItem(cartId, bookId, item.quantity);

        console.log(`    + ${item.quantity} x ${item.bookSlug}`);
      }
    }

    /* --------------------------------------------------------
       COMMIT
       -------------------------------------------------------- */

    await client.query('COMMIT');

    console.log('');
    console.log('========================================');
    console.log('DATABASE SEED COMPLETED SUCCESSFULLY');
    console.log('========================================');
    console.log('');
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch (_) {
      // No hay nada que revertir.
    }

    console.error('');
    console.error('========================================');
    console.error('DATABASE SEED FAILED');
    console.error('========================================');
    console.error('');
    console.error(error.message);
    console.error('');

    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
