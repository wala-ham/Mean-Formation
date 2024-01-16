const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const express = require('express')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const router = express.Router()
const User = require('../models/user');


const app = express();
app.use(express.json());
//annotation
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         age:
 *           type: number
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         products : 
 *            type : List[products]
 *       example:
 *         name: John
 *         lastname: Doe
 *         age: 25
 *         email: john.doe@example.com
 *         password: securepassword
 *         products: ["656b9df56e1c59becc498f78", "657378c74a820b3c29f25751"]
 */





router.post('/add' , (req,res)=>{
    data = req.body;
    //app.use(express.json());
    usr = new User(data);
    usr.save()
        .then(
                (savedUser)=>{
                res.send(savedUser)
                }
            )
        .catch(
                (err) =>{
                res.send(err)
                }
            )  
});
//with products
router.post('/create', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data); // Assurez-vous que la classe User est correctement définie
        
        // If products are provided in the request, add them to the user's products array
        if (data.products && data.products.length > 0) {
            newUser.products = newUser.products;
        }


        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/getall', (req, res) => {
    User.find()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/all' ,async (req,res) => {
    try {
        // users = await User.find({age :  24 });
        users = await User.find({age :  { $gt: 30 } });
        res.send(users);
    } catch (error) {
        res.send(error)
    }
})


router.get('/getbyid/:id', (req, res) => {
    const myId = req.params.id; // Utilisez const pour déclarer la variable
    User.findOne({ _id: myId })
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

router.get('/byid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id); // Utilisez simplement User.findById(id)
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete('/delete' , ()=>{
    console.log('deleted')
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    User.findOneAndDelete({ _id: id })//si il trouve pas une condition il va supprimer 1er element trouvé
        .then((deletedUser) => {
            res.send(deletedUser);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

router.delete('/del/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        res.send(deletedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/put' , ()=>{
    console.log('putting')
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    User.findByIdAndUpdate(id, newData)
        .then((updated) => {
            res.send(updated);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

router.put('/upt/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const updated = await User.findByIdAndUpdate(id, newData);
        res.send(updated);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/register', async (req, res) => {
    try {
        const data = req.body;
        const usr = new User(data);
        
        // Générer le sel
        const salt = bcrypt.genSaltSync(10);
        

        // Hasher le mot de passe avec le sel
        const cryptedPass = await bcrypt.hashSync(data.password, salt);
        console.log("ceypt")

        // Enregistrer le mot de passe hashé dans l'objet utilisateur
        usr.password = cryptedPass;

        // Enregistrer l'utilisateur dans la base de données
        const savedUser = await usr.save();

        res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}); 

router.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });

        if (!user) {
            res.status(404).send('Email or password invalid!');
        } else {
            const validPass = bcrypt.compareSync(data.password, user.password);

            if (!validPass) {
                res.status(401).send('Email or password invalid!');
            } else {
                const payload = {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                };

                const token = jwt.sign(payload, '1234567');//sekret key
                res.status(200).send({ mytoken: token });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const url ='http://localhost:3000/'


router.post('/add' , (req,res)=>{
    data = req.body;
    //app.use(express.json());
    usr = new User(data);
    usr.save()
        .then(
                (savedUser)=>{
                res.send(savedUser)
                }
            )
        .catch(
                (err) =>{
                res.send(err)
                }
            )  
});
/**
 * @swagger
 * /user/add:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully
 *               user:
 *                 name: wala
 *                 lastname: hamemi
 *                 age: 25
 *                 email: john.doe@example.com
 *                 password: securepassword
 *                 products: ["656b9df56e1c59becc498f78", "657378c74a820b3c29f25751"]
 *       '400':
 *         description: Bad request, check your input data
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user with products
 *     description: Create a new user with the provided information and associated products.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully
 *               user:
 *                 name: John
 *                 lastname: Doe
 *                 age: 25
 *                 email: john.doe@example.com
 *                 password: securepassword
 *                 products: ["657378c74a820b3c29f25751"]
 *       '400':
 *         description: Bad request, check your input data
 */

/**
 * @swagger
 * /user/getall:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               users:
 *                 - name: John
 *                   lastname: Doe
 *                   age: 25
 *                   email: john.doe@example.com
 *                 - name: Jane
 *                   lastname: Doe
 *                   age: 30
 *                   email: jane.doe@example.com
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get users with age greater than 30
 *     responses:
 *       '200':
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               users:
 *                 - name: Jane
 *                   lastname: Doe
 *                   age: 35
 *                   email: jane.doe@example.com
 */

/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update a user's information by providing the user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               age:
 *                 type: number
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User updated successfully
 *               updatedUser:
 *                 name: UpdatedName
 *                 lastname: UpdatedLastName
 *                 age: 30
 *                 email: updated.email@example.com
 *                 password: updatedpassword
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by providing the user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully
 *               deletedUser:
 *                 name: DeletedName
 *                 lastname: DeletedLastName
 *                 age: 25
 *                 email: deleted.email@example.com
 *                 password: deletedpassword
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *               user:
 *                 name: John
 *                 lastname: Doe
 *                 age: 25
 *                 email: john.doe@example.com
 *       '400':
 *         description: Bad request, check your input data
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Log in an existing user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User logged in successfully
 *               user:
 *                 name: John
 *                 lastname: Doe
 *                 age: 25
 *                 email: john.doe@example.com
 *               token: jwtToken
 *       '401':
 *         description: Unauthorized, check your credentials
 */


module.exports = router;