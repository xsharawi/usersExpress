# Express Users

a very simple api made with typescript, express, typeorm to store users and retrive all users into and from a database

# Installtion

installation should be straight forward just clone the repo and do `npm install`,
you'll also need `npm install reflect-metadata --save` 

# Usage
- to use the get endpoint all you need is to send a get request to `http://{hostname}/user`
- to use the register endpoint you'll need to use `http://{hostname}/user/register` and include a json object that includes but not limited to `email` and `password`
