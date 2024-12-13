import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriendToUser, removeFriendFromUser } from '../../controllers/userController.js';



// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId
router.route("/:userId/friends/:friendId").post(addFriendToUser).delete(removeFriendFromUser);

export default router;
