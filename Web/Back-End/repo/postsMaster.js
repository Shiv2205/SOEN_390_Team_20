const DBControllerFactory = require("../Factory/DBControllerFactory");

class PostsMaster {
  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  /**
   * The function `createPost` asynchronously creates a new post in a database with specified
   * properties.
   * @returns The `createPost` function is returning the result of `this.dbController.createNewPost({
   * property_id, creator_id, content, replied_to})` after awaiting its completion.
   */
  async createPost({ property_id, creator_id, content, replied_to = "" }) {
    try {
        return await this.dbController.createNewPost({ property_id, creator_id, content, replied_to});
    } catch (error) {
        return error;
    }
  }

  /**
   * The function `getUserPosts` asynchronously retrieves all posts created by a specific user from the
   * database.
   * @param creator_id - The `creator_id` parameter is the unique identifier of the user whose posts
   * you want to retrieve.
   * @returns The `getUserPosts` function is returning the result of calling
   * `this.dbController.getAllUserPosts(creator_id)` after awaiting its completion.
   */
  async getUserPosts(creator_id) {
    try {
        return await this.dbController.getAllUserPosts(creator_id);
    } catch (error) {
        return error;
    }
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
  async getPropertyPosts(property_id) {
    try {
        return await this.dbController.getAllPropertyPosts(property_id);
    } catch (error) {
        return error;
    }
  }
}

module.exports = PostsMaster;