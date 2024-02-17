const express = require('express')
const db = require('./server/models')
const { Op } = require('sequelize');
const app = express()


app.listen(3000, () => { console.log("Server started successfulyy") })


app.get("/address-count", async (req, res) => {
    try {
        // Find the student and count their associated addresses
        const result = await db.student.findAll({
            where: {
                id: 3
            },
            attributes: ['id', [db.sequelize.fn('COUNT', db.sequelize.col('addresses.id')), 'addressCount']
            ],
            include: [{
                model: db.address,
                attributes: []
            }],
            group: ['student.id']
        });
        const addressCount = result ? result.addressCount : 0;
        res.json({ addressCount });
    } catch (error) {
        console.log("Error in fetching students:", error);
        res.status(500).json({ error: "Error in fetching students" });
    }
});

app.get("/student", async (req, res) => {
    try {
        const studentId = 2; // Assuming you want to find addresses for student with id 1

        // Find the student and count their associated addresses
        const result = await db.student.findOne({
            where: { id: studentId },
            include: [
                {
                    model: db.address,
                    attributes: []
                }
            ],
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('addresses.id')), 'addressCount']
            ],

            raw: true
            /* Sequelize doesn't know how to map an aggregated result to a model instance. 
            Therefore, in this case, you should use raw: true to get the count directly as 
            a plain JavaScript object.*/
        });
        console.log("result", result)
        // Access the address count from the result
        const addressCount = result ? result.addressCount : 0;

        res.json({ addressCount });
    } catch (error) {
        console.log("Error in fetching students:", error);
        res.status(500).json({ error: "Error in fetching students" });
    }
});


////////////////////////////////////////////////////////////////////////////////////

app.get("/all-student", async (req, res) => {
    try {
        const studentsInCity = await db.student.findAll({
            include: [{
                model: db.address,
                where: { city: "kotdwara" },
            }],
            attributes: ['id', [db.sequelize.literal('CONCAT("first_name", "last_name")'), 'fullName']] // Select only the student names
        });
        res.json(studentsInCity);
    } catch (error) {
        console.log("Error in fetching students:", error);
        res.status(500).json({ error: "Error in fetching students" });
    }
});
/////////////////////////////////////////////////////////////////////
app.get("/student-count", async (req, res) => {
    try {
        const result = await db.student.findAll({
            where: { id: 2 },
            attributes: [
                'id',
                [db.sequelize.fn('COUNT', db.sequelize.col('addresses.id')), 'addressCount']
            ],
            include: [{
                model: db.address,
                attributes: []
            }],
            group: ['student.id']
        });

        console.log("result", result);

        const addressCount = result ? result.addressCount : 0;

        res.json({ addressCount });

    } catch (error) {
        console.log("Error in fetching students:", error);
        res.status(500).json({ error: "Error in fetching students" });
    }
});
/////////////////////////////////////////////////////////////////////////
app.get("/stu", async (req, res) => {
    try {
        const studentId = 2;

        const result = await db.student.findOne({
            where: { id: studentId },
            include: [
                {
                    model: db.address,
                    attributes: [],
                    required: false // Use a LEFT JOIN to include students with no addresses
                }
            ],
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('addresses.id')), 'address_count']
            ]
        });

        console.log(result.address_count); // This will log the address count for student with id 2
        res.json(result);
    } catch (error) {
        console.log("Error in fetching students:", error);
        res.status(500).json({ error: "Error in fetching students" });
    }
});
//eager loading 

app.get("/eager-loading", async (req, res) => {
    try {
        const studentId = 2;
        const result = await db.student.findOne({
            where: { id: studentId },
            include: [
                {
                    model: db.address,
                    attributes: ['id']
                }]

        });
        console.log("result", result)
        res.json({ result });
    } catch (error) {
        console.log("Error in fetching students:", error);
        res.status(500).json({ error: "Error in fetching students" });
    }
});

//lazy loading

app.get("/lazy-loading", async (req, res) => {
    try {
        const studentId = 2;
        const studentInfo = await db.student.findOne({ where: { id: studentId } });
        const addressInfo = await studentInfo.getAddresses();
        console.log("Student Info:", studentInfo);
        console.log("Address Info:", addressInfo);

        res.json({ studentInfo, addressInfo });
    } catch (error) {
        console.log("Error in fetching student and addresses:", error);
        res.status(500).json({ error: "Error in fetching student and addresses" });
    }
});


app.get("/count", async (req, res) => {
    try {
        const studentId = 3;

        // Find the student details
        const student = await db.student.findOne({
            where: { id: studentId }
        });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Count the number of addresses associated with the student
        const addressCount = await db.address.count({
            where: { studentId }
        });

        res.json({ student, addressCount });
    } catch (error) {
        console.log("Error in fetching student and counting addresses:", error);
        res.status(500).json({ error: "Error in fetching student and counting addresses" });
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////



app.use(express.urlencoded({ extended: false }))

//insert student
app.post("/add-student", async (req, res) => {
    try {
        const { first_name, last_name, date_of_birth, gender, email, phone } = req.body; //destructuring of object
        console.log(req.body)
        const newStudent = await db.student.create({
            first_name,
            last_name,
            date_of_birth,
            gender,
            email,
            phone
        });
        console.log("Student details are", newStudent)
        res.send(newStudent)
        //res.status(200).json({ result: newStudent });
    } catch (error) {
        console.error('Error in creating student :', error);
        res.status(500).send('Error creating student ');
    }
});
//insert address and increase the address-cout by 1 

app.post("/add-address", async (req, res) => {
    try {
        const { state, country, studentId, city } = req.body
        const newAddress = await db.address.create({
            state, country, studentId, city
        });
        console.log("newAddress", newAddress)
        if (!newAddress) {
            return res.json({ msg: "Failed to create address" });
        }
        console.log("studentId",studentId)
        if (studentId) {
            console.log("Update address-count in student-table")
            const updateStudent = await db.student.update(
                { count: db.sequelize.literal('count + 1') },
                { where: { id: null } }
            );
            console.log("address_count updated sucessfully", updateStudent)
            if (!updateStudent) {
                console.log("Failed to update address_count")
                await db.address.update(
                    { studentId: null },
                    { where: { studentId: studentId } }
                )
                return res.json({ msg: "Failed to mapped the address with student" })
            }
        }
        res.status(200).json({ result: newAddress });
    } catch (error) {
        console.error('Error in creating address', error);
        res.status(500).send('Error creating address ');
    }
});
// delete the addres and decrease the address-count by 1

app.post("/delete-address", async (req, res) => {
    try {
        const { addressId } = req.body
        const addressInfo = await db.address.findOne({
            where: {
                id: addressId
            }
        })
        if (!addressInfo) {
            res.status(404).json({ msg: "Address not found" })
        }
        const deleteAddress = await db.address.destroy(
            { where: { id: addressId } })
        const studentId = addressInfo.studentId
        if (deleteAddress && studentId) {
            const updateCount = await db.student.update(
                { count: db.sequelize.literal('count - 1') },
                { where: { id: studentId } }
            );
            if (!updateCount)
                res.send("Address deleted successfully but failed to update the address_count")
        }
        //  await db.student.decrement('count', { where: { id: studentId } });
        res.status(200).json({ msg: "Delete successfully" });
    }
    catch (error) {
        console.error('Error in deleting address', error);
        res.status(500).send('Error deleting address ');
    }
})

//fetch student information with address count

app.post("/student-details", async (req, res) => {
    try {
        const { studentId } = req.body;

        const studentInfo = await db.student.findOne({
            where: { id: studentId }
        });

        if (!studentInfo)
            return res.status(404).json({ msg: "Student not found" });

        return res.status(200).json(studentInfo);
    } catch (error) {
        console.error('Error in fetching student details', error);
        return res.status(500).send('Error in fetching student details');
    }
});

//retirve only those students who have address

app.get("/student-with-no-address", async (req, res) => {
    try {
        const students = await db.student.findAll({
            include: [{
                model: db.address,
                attributes: [],
            }],
            where: {
                id: {
                    [Op.notIn]: db.sequelize.literal(
                        `(SELECT "studentId" FROM addresses)`
                    )
                }
            }
        });

        if (students.length === 0)
            return res.status(404).json({ msg: "Students not found" });

        return res.status(200).json(students);
    } catch (error) {
        console.error('Error in fetching student details', error);
        return res.status(500).send('Error in fetching student details');
    }
});

//get those students who don't have any address associated with them

app.get("/no-address", async (req, res) => {
    try {
        const students = await db.student.findAll({
            include: [{
                model: db.address,
                attributes: [],
                required: false // Include students even if they have no associated addresses
            }],
            where: {
                '$addresses.studentId$': null // to access properties of associated models
            }
        });

        if (students.length === 0)
            return res.status(404).json({ msg: "Students not found" });

        return res.status(200).json(students);
    } catch (error) {
        console.error('Error in fetching student details', error);
        return res.status(500).send('Error in fetching student details');
    }
});

//address-count task with the help of transaction

app.post("/add-address-transaction", async (req, res) => {

    try {
        const { state, country, studentId, city } = req.body
        const newAddress = await db.address.create({
            state, country, studentId, city
        });
        console.log("newAddress", newAddress)
        if (!newAddress) {
            return res.json({ msg: "Failed to create address" });
        }
        console.log("studentId",studentId)
        if (studentId) {
            console.log("Update address-count in student-table")
            const updateStudent = await db.student.update(
                { count: db.sequelize.literal('count + 1') },
                { where: { id: null } }
            );
            console.log("address_count updated sucessfully", updateStudent)
            if (!updateStudent) {
                console.log("Failed to update address_count")
                await db.address.update(
                    { studentId: null },
                    { where: { studentId: studentId } }
                )
                return res.json({ msg: "Failed to mapped the address with student" })
            }
        }
        res.status(200).json({ result: newAddress });
    } catch (error) {
        console.error('Error in creating address', error);
        res.status(500).send('Error creating address ');
    }
});