import { Router } from 'express';
import { signUp, signIn } from '../controllers/auth.controller';
import {
	checkDuplicateEmailorUsername,
	verifyProfiles,
} from '../middlewares/verifySingup';

const router = Router();

router.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Headers',
		'x-access-token, Origin, Content-Type, Accept'
	);
	next();
});
// Create User
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        user:
 *          type: string
 *          description: user name
 *        name:
 *          type: string
 *          description: real name
 *        lastName:
 *          type: string
 *          description: user last name
 *        password:
 *          type: string
 *          description: user password
 *        telephone:
 *          type: string
 *          description: user telephone
 *        email:
 *          type: string
 *          description: user email
 *        available:
 *          type: boolean
 *          description: if user is anable
 *        dui:
 *          type: string
 *          description: user dui
 *        profileId:
 *          type: integer
 *          description: user type profile
 *        branchofficeId:
 *          type: string
 *          description: branch where user is
 *      required:
 *        - user
 *        - name
 *        - lastName
 *        - password
 *        - telephone
 *        - email
 *        - available
 *        - dui
 *        - profileId
 *        - branchofficeId
 *      example:
 *        name: Brayan
 *        lastName: Perez
 *        user: perez.brayan
 *        telephone: 7177-5632
 *        email: brayan.perez@siman.com
 *        password: Siman123!
 *        available: true
 *        dui : 01234567-8
 *        branchofficeId: 1
 *        profileId: 2
 */

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: new user created!
 *        content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
 */
router.post('/signup', [checkDuplicateEmailorUsername, verifyProfiles], signUp);
router.post('/signin', signIn);

export default router;
