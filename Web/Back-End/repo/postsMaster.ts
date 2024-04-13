import DBControllerFactory from "../Factory/DBControllerFactory";
import IDBController from "../interfaces/IDBController";
import {
  PostData,
  PostDetails,
  UnitDetails,
} from "../types/DBTypes";

class PostsMaster {
  readonly dbController: IDBController; // Adjust the type according to your DBController type

  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  /**
   * The function `createPost` asynchronously creates a new post in a database with specified
   * properties.
   * @returns The `createPost` function is returning the result of `this.dbController.createNewPost({
   * property_id, creator_id, content, replied_to})` after awaiting its completion.
   */
  async createPost({
    property_id,
    creator_id,
    content,
    replied_to = "",
  }: PostData): Promise<{ status: number; post_id: string } | Error> {
    let result = await this.dbController.createNewPost({
        property_id,
        creator_id,
        content,
        replied_to,
      });
    if (result instanceof Error) return result as Error;
    return result as { status: number; post_id: string };
  }

  /**
   * The function `getUserPosts` asynchronously retrieves all posts created by a specific user from the
   * database.
   * @param creator_id - The `creator_id` parameter is the unique identifier of the user whose posts
   * you want to retrieve.
   * @returns The `getUserPosts` function is returning the result of calling
   * `this.dbController.getAllUserPosts(creator_id)` after awaiting its completion.
   */
  async getUserPosts(
    creator_id: string
  ): Promise<{ status: number; data: PostDetails[] } | Error> {
    let result = await this.dbController.getAllUserPosts(creator_id);
    if (result instanceof Error) return result as Error;
    return result as { status: number; data: PostDetails[] };
  }

  /**
   * The function `getPropertyPosts` asynchronously retrieves all posts related to a specific property
   * ID using a database controller.
   * @param property_id - The `property_id` parameter is the unique identifier or key associated with a
   * specific property. It is used to retrieve all posts related to that particular property from the
   * database.
   * @returns The `getPropertyPosts` function is returning the result of calling
   * `getAllPropertyPosts(property_id)` from the `dbController`. This function is an asynchronous
   * function that fetches all property posts related to the given `property_id`. The function is using
   * `await` to wait for the promise to resolve before returning the result.
   */
  async getPropertyPosts(property_id: string): Promise<{ status: number; data: PostDetails[] } | Error> {
    let result = await this.dbController.getAllPropertyPosts(property_id);
    if (result instanceof Error) return result as Error;
    return result as { status: number; data: PostDetails[] };
  }
}

export default PostsMaster;
