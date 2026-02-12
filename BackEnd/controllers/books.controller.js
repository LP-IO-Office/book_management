const pool = require("../db");

exports.getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const re = await pool.query(
            "select * from books order by created_at DESC, id DESC limit $1 offset $2",
            [limit, offset]
        );

        res.json(re.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const re = await pool.query(
            "select * from books where id = $1",
            [req.params.id]
        );

        if (re.rows.length === 0) {
            return res.status(404).json({ message: "BOOK NOT FOUND" });
        }

        res.json(re.rows[0]);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, description, rating } = req.body;

        const re = await pool.query(
            "insert into books (title, author, description, rating) values ($1,$2,$3,$4) returning *",
            [title, author, description, rating]
        );

        res.status(201).json(re.rows[0]);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { title, author, description, rating } = req.body;

        await pool.query(
            "update books set title=$1, author=$2, description=$3, rating=$4 where id=$5",
            [title, author, description, rating, req.params.id]
        );

        res.json({ message: "BOOK UPDATED SUCCESSFULLY" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.patchBook = async (req, res) => {
    try {
        const fields = [];
        const values = [];
        let index = 1;

        for (let key in req.body) {
            fields.push(`${key}=$${index}`);
            values.push(req.body[key]);
            index++;
        }

        values.push(req.params.id);

        await pool.query(
            `update books set ${fields.join(", ")} where id=$${index}`,
            values
        );

        res.json({ message: "BOOK PARTIALLY UPDATED" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await pool.query("delete from books where id=$1", [req.params.id]);
        res.json({ message: "BOOK DELETED SUCCESSFULLY" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
