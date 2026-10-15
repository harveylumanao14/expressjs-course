import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

const userId = "ee48dda9-d126-470c-8e55-d1c3b762957f";

const movies = [
    {
        title: "Transformers",
        overview: "Two alien robot factions, the heroic Autobots and the evil Decepticons",
        releaseYear: 2007,
        genres: ["Action", "Sci-Fi"],
        runtime: 152,
        posterUrl: "https://example.com/transformers.jpg",
        createdBy: userId
    },
    {
        title: "Inception",
        overview: "A skilled thief enters people's dreams to steal secrets and is offered a chance to erase his past.",
        releaseYear: 2010,
        genres: ["Action", "Sci-Fi", "Thriller"],
        runtime: 148,
        posterUrl: "https://example.com/inception.jpg",
        createdBy: userId
    },
    {
        title: "The Dark Knight",
        overview: "Batman faces a criminal mastermind who plunges Gotham City into chaos.",
        releaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://example.com/the-dark-knight.jpg",
        createdBy: userId
    },
    {
        title: "Interstellar",
        overview: "A team of explorers travels beyond this galaxy to find a future for humanity.",
        releaseYear: 2014,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        runtime: 169,
        posterUrl: "https://example.com/interstellar.jpg",
        createdBy: userId
    },
    {
        title: "Jurassic Park",
        overview: "Visitors to a groundbreaking dinosaur theme park must survive when its security systems fail.",
        releaseYear: 1993,
        genres: ["Adventure", "Sci-Fi", "Thriller"],
        runtime: 127,
        posterUrl: "https://example.com/jurassic-park.jpg",
        createdBy: userId
    },
    {
        title: "The Matrix",
        overview: "A computer hacker discovers that reality is a simulated world controlled by machines.",
        releaseYear: 1999,
        genres: ["Action", "Sci-Fi"],
        runtime: 136,
        posterUrl: "https://example.com/the-matrix.jpg",
        createdBy: userId
    },
    {
        title: "Finding Nemo",
        overview: "A cautious clownfish crosses the ocean to find his son, who has been taken by divers.",
        releaseYear: 2003,
        genres: ["Animation", "Adventure", "Comedy"],
        runtime: 100,
        posterUrl: "https://example.com/finding-nemo.jpg",
        createdBy: userId
    },
    {
        title: "The Shawshank Redemption",
        overview: "Two inmates form a lasting friendship while holding on to hope inside a harsh prison.",
        releaseYear: 1994,
        genres: ["Drama"],
        runtime: 142,
        posterUrl: "https://example.com/the-shawshank-redemption.jpg",
        createdBy: userId
    },
    {
        title: "Spirited Away",
        overview: "A young girl enters a mysterious spirit world and searches for a way to rescue her parents.",
        releaseYear: 2001,
        genres: ["Animation", "Adventure", "Fantasy"],
        runtime: 125,
        posterUrl: "https://example.com/spirited-away.jpg",
        createdBy: userId
    },
    {
        title: "The Grand Budapest Hotel",
        overview: "A concierge and his lobby boy become entangled in a dispute over a valuable family inheritance.",
        releaseYear: 2014,
        genres: ["Comedy", "Drama"],
        runtime: 99,
        posterUrl: "https://example.com/the-grand-budapest-hotel.jpg",
        createdBy: userId
    },
    {
        title: "Get Out",
        overview: "A young man visits his girlfriend's family estate and uncovers a disturbing secret.",
        releaseYear: 2017,
        genres: ["Horror", "Mystery", "Thriller"],
        runtime: 104,
        posterUrl: "https://example.com/get-out.jpg",
        createdBy: userId
    },
    {
        title: "Coco",
        overview: "An aspiring young musician journeys to the Land of the Dead to discover his family's history.",
        releaseYear: 2017,
        genres: ["Animation", "Adventure", "Family"],
        runtime: 105,
        posterUrl: "https://example.com/coco.jpg",
        createdBy: userId
    }
];

const main = async () => {
    console.log("Seeding movies...");

    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
    }

    console.log("Seeding completed!");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
})