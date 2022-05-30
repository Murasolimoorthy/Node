const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const http = require("http").createServer(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: "*"
}));

// Local connection (how to connect data base in nodejs??)
var connection = mysql.createConnection({
  host: "localhost",             // get from user account in DB
  user: "root",                   // get from user account in DB
  password: "",
  database: "vecentry22"         //data base name

});

connection.connect((error) => {       // how to establish the connection??
  if (error) {
    throw error;

  }
  console.log("MYSQL database is connected sucessfully");
});

//how to create API in nodejs?? get method;
app.get("/api/student/list", (request, response) => {

  var sql_query = `SELECT * FROM student_data`;

  connection.query(sql_query, (error, result) => {           //how to make run our query?

    if (error) {
      response.status(500).send({                                 //Status code 200,201,202,204 --> sucess
        error,                                                    //400, 404 --> client side error msg  
        message: "Sorry for inconvience delay,Please try again Later"   //500,501,502---> sever side erorr msg
      });
      return;

    }
    response.status(200).send(result);
  })

});


app.post("/api/student/information/create", (request, response) => {

  var name = request.body.name;
  var age = request.body.age;
  var location = request.body.location;

  var sql_query = `INSERT INTO student_data (name,age,location) VALUES ('${name}', ${age}, '${location}')`;

  connection.query(sql_query, (error, result) => {
    if (error) {
      response.status(500).send({
        error,
        message: "Sorry...not able to insert your data rightnow, Please try again later."
      });
      return;
    }
    response.status(200).send({
      result,
      message: "Your Data has been inserted Sucessfully..."
    });
  })

});

app.put("/api/student/edit/:id",(request,response)=>{
  var id =request.params.id;

  var name =request.body.name;
  var age =request.body.age;
  var location=request.body.location;

  var sql_query = `UPDATE student_data SET name = '${name}', age = ${age}, location = '${location}' WHERE Id = '${id}'`;

  connection.query (sql_query, (error,result)=>{
    if(error){
      response.status(500).send({
        error,
        message : "Sorry Not able to Edit your Data, Please Try again Later..."
      });
      return;

    }
      response.status(200).send({
        result,
        message : "Your Data Has been edited Sucessfully..."
      });

  })

});

app.delete ("/api/student/delete/:id",(request,response)=>{

var id = request.params.id;


var sql_query = `DELETE FROM student_data WHERE Id = '${id}' `;

connection.query(sql_query,(error,result)=>{
if (error){
  response.status(500).send({
  error,
  message: "Not able to Erase your Data rightnow, Please try again Later..."
});
return;  
}
response.status(200).send({
  result,
  message:"Your Data has been Erased Sucessully..."
});

})

});



const port = process.env.PORT || 4000;
http.listen(port, () => {
  console.log("Node JS Server is running on port 4000");
})

// // // // // // // // // // const express = require("express");
// // // // // // // // // // const bodyParser = require("body-parser");
// // // // // // // // // // const cors = require("cors");
// // // // // // // // // // const mysql = require("mysql");

// // // // // // // // // // const app = express();
// // // // // // // // // // const http = require("http").createServer(app);

// // // // // // // // // // app.use(express.json());
// // // // // // // // // // app.use(bodyParser.json());
// // // // // // // // // // app.use(cors({
// // // // // // // // // //   credentials : true,
// // // // // // // // // //   origin : "*"
// // // // // // // // // // }));

// // // // // // // // // // //Local Database
// // // // // // // // // // var connection = mysql.createConnection({
// // // // // // // // // //   host : "localhost",
// // // // // // // // // //   user: "root",
// // // // // // // // // //   password: "",
// // // // // // // // // //   database: "vecentry22"
// // // // // // // // // // });

// // // // // // // // // // //Online Database
// // // // // // // // // // // var connection = mysql.createConnection({
// // // // // // // // // // //   host : "remotemysql.com",
// // // // // // // // // // //   user: "wym4khPjwJ",
// // // // // // // // // // //   password: "IpVePeo1GV",
// // // // // // // // // // //   database: "wym4khPjwJ",
// // // // // // // // // // //   port: 3306
// // // // // // // // // // // });

// // // // // // // // // // connection.connect((error) => {
// // // // // // // // // //   if(error){
// // // // // // // // // //     throw error;
// // // // // // // // // //   }

// // // // // // // // // //   console.log("MYSQL database is connected successfully");
// // // // // // // // // // });


// // // // // // // // // // // http://localhost:4000/api/student/list
// // // // // // // // // // app.get("/api/student/list", (request, response) => {
// // // // // // // // // //   var sql_query = `SELECT * FROM student_data`;

// // // // // // // // // //   connection.query(sql_query, (error, result) => {
// // // // // // // // // //     if(error){
// // // // // // // // // //       response.status(500).send({
// // // // // // // // // //         error,
// // // // // // // // // //         message: "Sorry something went wrong in server, pls try again!"
// // // // // // // // // //       });
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     response.status(200).send(result);
// // // // // // // // // //   })
// // // // // // // // // // });

// // // // // // // // // // // http://localhost:4000/api/student/create
// // // // // // // // // // app.post("/api/student/create", (request, response) => {
// // // // // // // // // //   var name = request.body.name;
// // // // // // // // // //   var age = request.body.age;
// // // // // // // // // //   var location = request.body.location;
// // // // // // // // // //   var grade = request.body.grade;

// // // // // // // // // //   var sql_query = `INSERT INTO student_information (name, age, location, grade) VALUES ('${name}', ${age}, '${location}', '${grade}')`;

// // // // // // // // // //   connection.query(sql_query, (error, result) => {
// // // // // // // // // //     if(error){
// // // // // // // // // //       response.status(500).send({
// // // // // // // // // //         error,
// // // // // // // // // //         message: "Sorry something went wrong in server, pls try again!"
// // // // // // // // // //       });
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     response.status(200).send({
// // // // // // // // // //       result,
// // // // // // // // // //       message : "Successfully User Profile has been Created"
// // // // // // // // // //     });
// // // // // // // // // //   })

// // // // // // // // // // })

// // // // // // // // // // // http://localhost:4000/api/student/edit/1
// // // // // // // // // // app.put("/api/student/edit/:id", (request, response) => {
// // // // // // // // // //   var id = request.params.id;

// // // // // // // // // //   var name = request.body.name;
// // // // // // // // // //   var age = request.body.age;
// // // // // // // // // //   var location = request.body.location;
// // // // // // // // // //   var grade = request.body.grade;

// // // // // // // // // //   var sql_query = `UPDATE student_information SET name='${name}', age=${age}, location='${location}', grade='${grade}' WHERE Id=${id}`;

// // // // // // // // // //   connection.query(sql_query, (error, result) => {
// // // // // // // // // //     if(error){
// // // // // // // // // //       response.status(500).send({
// // // // // // // // // //         error,
// // // // // // // // // //         message: "Sorry something went wrong in server, pls try again!"
// // // // // // // // // //       });
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     response.status(200).send({
// // // // // // // // // //       result,
// // // // // // // // // //       message : "Successfully User Profile has been Updated"
// // // // // // // // // //     });
// // // // // // // // // //   })

// // // // // // // // // // })

// // // // // // // // // // // http://localhost:4000/api/sutdent/delete/1
// // // // // // // // // // app.delete("/api/sutdent/delete/:id", (request, response) => {
// // // // // // // // // //   var id = request.params.id;

// // // // // // // // // //   var sql_query = `DELETE FROM student_information WHERE Id=${id}`;

// // // // // // // // // //   connection.query(sql_query, (error, result) => {
// // // // // // // // // //     if(error){
// // // // // // // // // //       response.status(500).send({
// // // // // // // // // //         error,
// // // // // // // // // //         message: "Sorry something went wrong in server, pls try again!"
// // // // // // // // // //       });
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     response.status(200).send({
// // // // // // // // // //       result,
// // // // // // // // // //       message : "Successfully Deleted a User Profile"
// // // // // // // // // //     });
// // // // // // // // // //   })

// // // // // // // // // // })

// // // // // // // // // // const port = process.env.PORT || 4000;
// // // // // // // // // // http.listen(port, () => {
// // // // // // // // // //   console.log("Node JS Server is running on port 4000");
// // // // // // // // // // })