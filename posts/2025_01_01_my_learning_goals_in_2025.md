# My learning goals in 2025

The tradition of set your new year goals, on this post I will focus only technical goals, personal are out. The division of my goals are divide on improving technologies that I already know, or learning alternatives, and getting out of comfort zone.I will summary what I expect from each specific goal.

## Improving current technology knowledge
### Accessibility
I'm not looking for build system design from zero and totally accessible. I'm looking on building UI that are accesible using components made by third parties. The principal resource is the course [Practical Accessibility by Sara Souedain](https://practical-accessibility.today/)

### CSS
A few years ago I completed [CSS For JS Dev by Josh Comeau](https://css-for-js.dev/), highly recommended. Since I attended to CSS Days in 2023, I haven't taken the time to keep update with the new features. A lot of new features are cross browser available and I haven't try them yet.

### React & Astro
Here I'm ignoring the Twitter dialog about React. It isn't the perfect library, but have a wide ecosystem and do the job, it's boring technology but it works. The same as CSS, React 19 have been released recently, so it's time to learn the new features. Not only that, also new patterns that have appear to handle states updates and DOM manipulation. 

From a framework perspective, I have been using Remix at work the last year and a half, so now I'm moving to React Router v7. TanStack is in my radar but as low priority. NextJS is out, to many abstractions and other decisions they made the last 2 years that lead me to avoid the framework.

### NodeJS (Hono)
Due the lack of maintenance of ExpessJS it's showing it's problem, lack of support of async function at handler for example. The good thing that NestJS is solving it, not really use it if you can. I know they have set up a new team of maintainers to tackle the tech debt and add new features, but I want to try new things. The other logical option is Fastify, but I decide to use Hono, not because the theoretical performance, but the ecosystem has been built around it in a short span of time.

### WASM
It's time to start using WASM in the Frontend or Backend. I have delayed so many times test WASM, but right now on how good is use DuckDB-WASM or it's possible to use WASM with Typescript, [AssemblyScript](https://www.assemblyscript.org/), I have no more excuses to try it.

### Authentication and Authorization
From the Authentication is check [BetterAuth](https://www.better-auth.com/) and how it can works in different scenarios.
The main focus here is Authorization. I'm "tired" of seeing half baked authorization systems that are hard to maintenance or improving, theses system start to get out of control when you start implement ReBAC and/or ABAC models. After a lot of time investigate, the solution I want to try is [Permify](https://permify.co/), mainly because I can self hosted it and it's v1. The other option was using solutions based on `OPA` but are cloud-first.

### Observability
Test the wide events approach. I have a vague idea but I wan't to test how to implement. The premises have already convince me, let's see how to add in the front or backend.

### PostgreSQL
Relearn SQL, last time I did was in the college, to learn do more in the database that in the app code. The last years I was trying to get out of the ORM worlds, and use libraries that are more SQL builder. The other aspect is to implement a few new ways to launch PostgreSQL for integration tests.

### Data Structures
It's time to update my toolkit of Data Structures, and maybe algorithms. Most of the time, the standard implementations are enough for my use cases, until it's not. A non exhaustive list:
- Trie: URL Pattern for HTTP server, IP Lookup.
- Mini RocksDB: BoomFilter, SkipList.
- Locks Data structure.
The main requisite to be study it's I can find a use case or I could have use if I would have know it at the time.

### Local First (Optional)
If I able to react this goal, I had a good year. The libraries are getting better and better, the main test is going to be how the handle security.

## Expanding Knowledge

Goals that are for things I'm not used to.

### Writing
I want to document all my journal of learnings in the blog, and my personal wiki.

### Rust
I have already started. I'm still far away to be comfortable to build something sophisticated, but the important thing is I'm already hooked to get better. Now I'm focus to learn about `borrowing checker`, `lifetimes`, `default traits` and more general concepts. I won't start doing ED from zero managing pointers, I'm still need to learn more, but I'm going to do more projects REST based or CLI based. If I get comfortable, the I'm going to move one layer down and try to do ED with pointers instead using the standard library.

### CKAD
I have to restart the course again, I won't try the exam, I just want to know how to use K8s as a developer.

### Streaming
I won't pivot my tech career to be a Data Engineer, but I want to understand this new paradigm. I'm going to try [Arroyo](https://www.arroyo.dev/) instead of Flink, as I'm learning Rust, to use Flink means to relearn Java again. Also I want to understand better about Parquet, Arrow and Iceberg. I have an idea and their differences, but I want a more deep knowledge of that.

### OLAP
Clickhouse and DuckDB, both are used in different use cases. 

### Redpanda
As in the streaming goal, using Redpanda instead of Kafka because in theory is more easy to setup.

### Zig (Optional)
As the time pass, I'm more convinced that Zig and Rust are complementary. Zig helps you to do unsafe operations, for example handling pointers, while Rust disallow you to do unsafe operations. IF I'm able to have time to learn it, I'm going to the opposite direction than Rust, starting building ED from zero handling pointers, and the move to upper layers.

### Conclusions
The list is long but multiples goals can be intermixed, for example React + CSS + WASM. I know I'm capable of doing it, I won't expect to do the 100% but with at 70%-80% is enough. I'm using [roadmap.sh](https://roadmap.sh/) for tracking purposes. I have on mind 2 big projects, buts these projects are a composition of multiples small one, except ED, CKAD and Zig, they have their own path. Let's see what I'm able to do this year

## Metadata
| Field | Value |
| - | - |
| Created At: | 2025-01-01 12:31 |
| Updated At: | - |
| Tag | Blogging |