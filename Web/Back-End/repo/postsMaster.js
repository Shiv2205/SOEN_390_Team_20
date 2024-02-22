const DBControllerFactory = require("../Factory/DBControllerFactory");

class PostsMaster {
  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  async createPost(postData) {
    try {
        return await this.dbController.createNewPost(postData);
    } catch (error) {
        console.log(error);
    }
  }

  async getUserPosts(creator_id) {
    try {
        return await this.dbController.getAllUserPosts(creator_id);
    } catch (error) {
        console.log(error);
    }
  }

  async getPropertyPosts(property_id) {
    try {
        return await this.dbController.getAllPropertyPosts(property_id);
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = PostsMaster;