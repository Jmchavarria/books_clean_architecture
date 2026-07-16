import { configDotenv } from 'dotenv';
import { AuthorsOrmEntity } from 'src/app/authors/infrastructure/persistence/entities/authors.orm-entity';
import { BookOrmEntity } from 'src/app/books/infrastructure/persistence/entities/book.orm-entity';
import { CategoryOrmEntity } from 'src/app/categories/infrastructure/persistence/entities/category.orm-entity';
import { DataSource } from 'typeorm';
configDotenv();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'books',
  entities: [AuthorsOrmEntity, BookOrmEntity, CategoryOrmEntity],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('🌱 Iniciando seed...');

  // 1. Categorías
  const categoryRepo = AppDataSource.getRepository(CategoryOrmEntity);
  const categories = await categoryRepo.save([
    { name: 'Programming', isActive: true },
    { name: 'Science Fiction', isActive: true },
    { name: 'History', isActive: true },
    { name: 'Philosophy', isActive: true },
    { name: 'Self-Help', isActive: true },
    { name: 'Biography', isActive: true },
    { name: 'Fantasy', isActive: true },
    { name: 'Mystery', isActive: true },
  ]);
  console.log(`✅ ${categories.length} categorías creadas`);

  // 2. Autores
  const authorRepo = AppDataSource.getRepository(AuthorsOrmEntity);
  const authors = await authorRepo.save([
    {
      name: 'Robert',
      lastname: 'Martin',
      birthdate: new Date('1952-12-05'),
      biography:
        'Software engineer and author, known as Uncle Bob. Pioneer of clean code and agile practices.',
      countryOfBirth: 'United States',
      literaryGenre: 'Technology',
      isActive: true,
    },
    {
      name: 'Frank',
      lastname: 'Herbert',
      birthdate: new Date('1920-10-08'),
      biography: 'American science fiction author best known for the novel Dune.',
      countryOfBirth: 'United States',
      literaryGenre: 'Science Fiction',
      isActive: true,
    },
    {
      name: 'Yuval Noah',
      lastname: 'Harari',
      birthdate: new Date('1976-02-24'),
      biography:
        'Israeli historian and professor, author of international bestsellers on human history.',
      countryOfBirth: 'Israel',
      literaryGenre: 'History',
      isActive: true,
    },
    {
      name: 'J.R.R.',
      lastname: 'Tolkien',
      birthdate: new Date('1892-01-03'),
      biography: 'English writer and professor, creator of the Middle-earth universe.',
      countryOfBirth: 'United Kingdom',
      literaryGenre: 'Fantasy',
      isActive: true,
    },
    {
      name: 'George',
      lastname: 'Orwell',
      birthdate: new Date('1903-06-25'),
      biography: 'English novelist and essayist, famous for his works on totalitarianism.',
      countryOfBirth: 'United Kingdom',
      literaryGenre: 'Fiction',
      isActive: true,
    },
    {
      name: 'Martin',
      lastname: 'Fowler',
      birthdate: new Date('1963-12-18'),
      biography:
        'Software developer and author, known for his work on refactoring and software architecture.',
      countryOfBirth: 'United Kingdom',
      literaryGenre: 'Technology',
      isActive: true,
    },
    {
      name: 'Walter',
      lastname: 'Isaacson',
      birthdate: new Date('1952-05-20'),
      biography: 'American author and journalist, known for his biographies of innovators.',
      countryOfBirth: 'United States',
      literaryGenre: 'Biography',
      isActive: true,
    },
    {
      name: 'Agatha',
      lastname: 'Christie',
      birthdate: new Date('1890-09-15'),
      biography: 'English writer known for her 66 detective novels and 14 short story collections.',
      countryOfBirth: 'United Kingdom',
      literaryGenre: 'Mystery',
      isActive: true,
    },
  ]);
  console.log(`✅ ${authors.length} autores creados`);

  // 3. Libros
  const bookRepo = AppDataSource.getRepository(BookOrmEntity);
  const books = await bookRepo.save([
    // Programming
    {
      title: 'Clean Code',
      description:
        'A handbook of agile software craftsmanship that teaches how to write readable, maintainable code.',
      authorId: authors[0].id,
      categoryId: categories[0].id,
      pages: 431,
      publishedYear: 2008,
      isActive: true,
    },
    {
      title: 'The Clean Coder',
      description:
        'A code of conduct for professional programmers covering responsibility, estimation, and pressure.',
      authorId: authors[0].id,
      categoryId: categories[0].id,
      pages: 256,
      publishedYear: 2011,
      isActive: true,
    },
    {
      title: 'Clean Architecture',
      description:
        "A craftsman's guide to software structure and design using clean architecture principles.",
      authorId: authors[0].id,
      categoryId: categories[0].id,
      pages: 432,
      publishedYear: 2017,
      isActive: true,
    },
    {
      title: 'Refactoring',
      description:
        'Improving the design of existing code through small, behavior-preserving transformations.',
      authorId: authors[5].id,
      categoryId: categories[0].id,
      pages: 448,
      publishedYear: 1999,
      isActive: true,
    },
    // Science Fiction
    {
      title: 'Dune',
      description:
        'Epic science fiction novel set in a distant future amidst a feudal interstellar society.',
      authorId: authors[1].id,
      categoryId: categories[1].id,
      pages: 688,
      publishedYear: 1965,
      isActive: true,
    },
    {
      title: 'Dune Messiah',
      description: 'The second book in the Dune Chronicles, following Paul Atreides as emperor.',
      authorId: authors[1].id,
      categoryId: categories[1].id,
      pages: 352,
      publishedYear: 1969,
      isActive: true,
    },
    // History
    {
      title: 'Sapiens',
      description:
        'A brief history of humankind from the Stone Age through the twenty-first century.',
      authorId: authors[2].id,
      categoryId: categories[2].id,
      pages: 443,
      publishedYear: 2011,
      isActive: true,
    },
    {
      title: 'Homo Deus',
      description:
        'A brief history of tomorrow exploring what might happen to jobs, wars and art in the future.',
      authorId: authors[2].id,
      categoryId: categories[2].id,
      pages: 448,
      publishedYear: 2015,
      isActive: true,
    },
    {
      title: '21 Lessons for the 21st Century',
      description:
        "An exploration of today's most urgent issues including AI, terrorism, and fake news.",
      authorId: authors[2].id,
      categoryId: categories[2].id,
      pages: 352,
      publishedYear: 2018,
      isActive: true,
    },
    // Fantasy
    {
      title: 'The Hobbit',
      description:
        'A fantasy novel about the adventures of hobbit Bilbo Baggins on a quest to reclaim a treasure.',
      authorId: authors[3].id,
      categoryId: categories[6].id,
      pages: 310,
      publishedYear: 1937,
      isActive: true,
    },
    {
      title: 'The Fellowship of the Ring',
      description:
        "The first volume of The Lord of the Rings, following Frodo's journey to destroy the One Ring.",
      authorId: authors[3].id,
      categoryId: categories[6].id,
      pages: 423,
      publishedYear: 1954,
      isActive: true,
    },
    {
      title: 'The Two Towers',
      description:
        'The second volume of The Lord of the Rings, following the fellowship after it breaks apart.',
      authorId: authors[3].id,
      categoryId: categories[6].id,
      pages: 352,
      publishedYear: 1954,
      isActive: true,
    },
    // Philosophy/Fiction
    {
      title: '1984',
      description:
        'A dystopian social science fiction novel about totalitarian surveillance and mind control.',
      authorId: authors[4].id,
      categoryId: categories[3].id,
      pages: 328,
      publishedYear: 1949,
      isActive: true,
    },
    {
      title: 'Animal Farm',
      description:
        'A satirical allegorical novella reflecting events leading up to the Russian Revolution.',
      authorId: authors[4].id,
      categoryId: categories[3].id,
      pages: 112,
      publishedYear: 1945,
      isActive: true,
    },
    // Biography
    {
      title: 'Steve Jobs',
      description:
        "The biography of Apple's co-founder based on more than forty interviews with Jobs himself.",
      authorId: authors[6].id,
      categoryId: categories[5].id,
      pages: 656,
      publishedYear: 2011,
      isActive: true,
    },
    {
      title: 'Leonardo da Vinci',
      description:
        'A biography of Leonardo da Vinci based on thousands of pages from his notebooks.',
      authorId: authors[6].id,
      categoryId: categories[5].id,
      pages: 624,
      publishedYear: 2017,
      isActive: true,
    },
    // Mystery
    {
      title: 'Murder on the Orient Express',
      description: 'A detective novel featuring Hercule Poirot investigating a murder on a train.',
      authorId: authors[7].id,
      categoryId: categories[7].id,
      pages: 256,
      publishedYear: 1934,
      isActive: true,
    },
    {
      title: 'And Then There Were None',
      description: 'Ten strangers are lured to an isolated island and murdered one by one.',
      authorId: authors[7].id,
      categoryId: categories[7].id,
      pages: 272,
      publishedYear: 1939,
      isActive: true,
    },
  ]);
  console.log(`✅ ${books.length} libros creados`);

  console.log('🎉 Seed completado exitosamente!');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Error en el seed:', error);
  process.exit(1);
});
