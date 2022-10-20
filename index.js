const express = require("express");
const conn = require("./models/db");
const app = express();
const handlebars = require("express-handlebars");

// Handlebars config
app.set("view engine", "handlebars");
app.engine(
	"handlebars",
	handlebars.engine({
		layoutsDir: __dirname + "/views/layouts", // puxa o html  "main", que invoca em cadeia
	})
);

// Tabela usuários.

// Exibe todos usuários cadastrados
app.get("/usuarios", function (req, res) {
	conn.query("SELECT * FROM usuarios", function (err, rows) {
		if (err) {
			res.send("error", err);
		} else {
			res.status(200).send(rows);
		}
	});
});
// Exibe um usuário em específico, mencionado no param
app.get("/usuarios/:id_usuario", function (req, res) {
	conn.query("SELECT * FROM usuarios where id_usuario=" + req.params.id_usuario,
		function (err, rows) {
			if (isNaN(req.params.id_usuario)) {
				res.status(400).send("400 - Erro, NaN!")
			} else {
                res.status(200).send(rows)			
            }
		}
	);
});
// Deleta um usuário em específico, mencionado no param
app.delete("/delusuarios/:id_usuario", function (req, res) {
    var sql = "DELETE * FROM usuarios where id_usuario="
	conn.query(sql + req.params.id_usuario,function (err, rows) {
			if (err) {
				res.status(400).send("error", err)
			} else {
				res.status(299).send(rows + "deleted");
			}
		}
	);
});
// Renderiza tela de cadUser
app.get("/usuarioss", function (req,res) {
	res.render("teste"); // Rota de cadastro de user
});
// Envia statuscode
app.get("/", function (req, res) {
	res.status(200).send(
	"Codigo:200\nStatus:Sucesso! \n Mensagem:Acao realizada com sucesso!"
	);
});
app.get("/", function (req, res) {
	res.status(404).send(
			"Codigo:400\nStatus:Erro! \n Mensagem:Acao nao realizada com sucesso!"
	);
});
app.listen(4242, function () {
	console.log("server running!");
});

/*
-----------------
Teste add info 
-----------------
res.send = envia uma resposta em forma de json para request da api
-----------------
DB DRIVER
To test whether a row exists in a MySQL table or not, use exists condition. 
The exists condition can be used with subquery. 
It returns true when row exists in the table, otherwise false is returned. 
True is represented in the form of 1 and false is represented as 0.
-----------------
app.post("/usuarios/teste", function(req,res){
    let sql = "INSERT INTO usuarios (nome, sobrenome, email, telefone, cpf) VALUES ("+req.params.nome+ req.params.sobrenome+ req.params.email+req.params.telefone+req.params.cpf+")"
    conn.query(sql, function(err,rows){
        if (err) {
            console.log(err)
        } else {
            console.log(rows);
        }
    })
})
*/