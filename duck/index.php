<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Initialize - Ducky</title>
  <link rel='stylesheet' href='css/ducky.css' />
  <script type='text/javascript' src='js/random.js' defer></script>
  <style>
    body {
      color: #eee;
      padding: 2em;
      background-color: #111;
    }

    p {
      font-family: 'Consolas';
    }

    .success {
      color: var(--ducky-success)
    }

    .danger {
      color: var(--ducky-danger)
    }

    .info {
      color: var(--ducky-info)
    }
  </style>
</head>
<body>
  <?php

    echo "<p class='info'>-> Intitializing database...</p>";

    $conn = new mysqli('localhost', 'root', '');

    if ($conn->connect_error) {
      echo "<p class='danger'>-> Failed to connect to database</p>";
      die;
    } else {
      echo "<p class='success'>-> Connected to database</p>";
    }

    $createDb = $conn->query("CREATE DATABASE IF NOT EXISTS duck");

    if ($createDb) {
      echo "<p class='success'>-> Ensured database `duck`</p>";
    } else {
      echo "<p class='danger'>-> Couldn't ensure database `duck`</p>";
      die;
    }

    $conn->close();
    $conn = new mysqli('localhost', 'root', '', 'duck');

    $dropTable = $conn->query("DROP TABLE IF EXISTS users");

    if ($dropTable) {
      echo "<p class='success'>-> Ensured table `users` doesn't exists</p>";
    } else {
      echo "<p class='danger'>-> Couldn't ensure table `users` doesn't exists</p>";
      die;
    }

    echo "<p class='info'>-> Createing table `users`";

    $createTable = $conn->query("CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT PRIMARY KEY, email varchar(255), name varchar(255), occupation varchar(255), age int, location varchar(255), issue varchar(255))");

    if ($createTable) {
      echo "<p class='success'>-> Ensured table `users`</p>";
    } else {
      echo "<p class='danger'>-> Couldn't ensure table `users`</p>";
      die;
    }

    echo "<p class='info timer'></p>";
  ?>

<script defer>
  let i = 7;
  setInterval(() => {
    document.body.style.backgroundColor = '#' + randomColor();
  }, 100);
  setInterval(() => {
    document.querySelector('.timer').innerHTML = `-> Redirecting to landing page in ${i}s`;
    if (i <= 0) window.location.href = './home.php';
    i--;
    },
  1_000);
</script>
</body>
</html>