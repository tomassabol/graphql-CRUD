import { Movie } from "src/entity/Movie";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class MovieResolver {

  @Mutation(() => Movie)
  async createMovie(
    @Arg("title", () => String) title: string, 
    @Arg("minutes", () => Int) minutes: number) {
        console.log(title, minutes);
        const movie = await Movie.create({ title, minutes }).save();
        return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string, 
    @Arg("minutes", () => Int) minutes: number
  ) {
    await Movie.update({ id }, { title, minutes });
    return true;
  }

  @Mutation(() => Boolean)
  deleteMovie(
    @Arg("id", () => Int) id: number) {
        Movie.delete({ id });
        return true;
  }

  @Query(() => [Movie])
    movies() {
        return Movie.find();
    }

}
