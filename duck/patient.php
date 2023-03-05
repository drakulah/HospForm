<!DOCTYPE html>
<html lang='en'>

<head>
  <title>Patient - Ducky</title>
  <meta charset='utf-8' />
  <meta name='viewport' content='width=device-width' />
  <!--CSS Declaration-->
  <link rel='stylesheet' href='css/ducky.css' />
  <link rel='stylesheet' href='css/common.css' />
  <link rel='stylesheet' href='css/patient.css' />
  <!--JS Declaration-->
  <script type='text/javascript' src='js/constants.js' defer></script>
  <script type='text/javascript' src='js/ducky.js' defer></script>
  <script type='text/javascript' src='js/home.js' defer></script>
  <script type='text/javascript' src='js/patient.js' defer></script>
</head>

<body>
  <div class='root'>
    <div class="topbar">
      <span class="logo">Ducky</span>

      <div class="tab-btn-container">
        <a href="./home.php">
          <span>Home</span>
        </a>
        <a href="./services.php">
          <span>Services</span>
        </a>
        <a>
          <span class="active">Patient</span>
        </a>
        <a href="./about.html">
          <span>About</span>
        </a>
      </div>

      <div class="other-container">
        <a href="https://www.facebook.com/drsndev/">
          <i class="ducky-icon">FACEBOOK</i>
        </a>
        <a href="https://www.instagram.com/_drsnroks_/">
          <i class="ducky-icon">INSTAGRAM</i>
        </a>
        <a href="https://github.com/drakaula">
          <i class="ducky-icon">GITHUB</i>
        </a>
      </div>
    </div>
    <div class="form-container">

      <div class="searchAndAdd">
        <form class="searchContainer">
          <input id='searchInput' type='text' autocomplete='off' placeholder='Search patients...' name='q' value='<?php
          $searchQuery = trim($_GET['q'] ?? '', ' ');
          echo $searchQuery;
          ?>' />
          <button type="submit">
            <i class="ducky-icon">SEARCH</i>
          </button>
        </form>
        <button class="filterSearch">Sort By</button>
      </div>

    </div>
    <div class="search-engine-body">
      <div class="data-viewer">
        <?php

        $age = trim($_POST['age'] ?? '', ' ');
        $email = trim($_POST['email'] ?? '', ' ');
        $issue = trim($_POST['issue'] ?? '', ' ');
        $location = trim($_POST['location'] ?? '', ' ');
        $fullname = trim($_POST['fullname'] ?? '', ' ');
        $occupation = trim($_POST['occupation'] ?? '', ' ');

        $conn = new mysqli('localhost', 'root', '', 'duck');

        if (strlen($age) && strlen($email) && strlen($issue) && strlen($location) && strlen($fullname) && strlen($occupation)) {
          $conn->query("INSERT INTO users (age, name, email, location, occupation, issue) VALUES ('$age', '$fullname', '$email', '$location', '$occupation', '$issue')");
        }

        $qArr = explode(' ', $searchQuery);
        $subQryArr = [];

        foreach (['name', 'age', 'email', 'occupation', 'location', 'issue'] as $colName) {
          foreach ($qArr as $word) {
            $word = trim($word, ' ');
            if (strlen($word) == 0)
              continue;
            array_push($subQryArr, "$colName LIKE '%$word%'");
          }
        }

        $subQry = implode(' OR ', $subQryArr);

        if (strlen($subQry) == 0) {
          $query = "SELECT * FROM users";
        } else {
          $query = "SELECT * FROM users WHERE $subQry";
        }

        $data = $conn->query($query);

        echo "<p>".$data->num_rows." results found for <strong>\"$searchQuery\"</strong></p>";

        foreach ($data as $eachRow) {
          $id = $eachRow['id'];
          $age = $eachRow['age'];
          $name = $eachRow['name'];
          $email = $eachRow['email'];
          $occupation = $eachRow['occupation'];
          $issue = $eachRow['issue'];
          $location = $eachRow['location'];

          echo "
            <div class='search-result'>
              <a class='url'>$email</a>
              <span class='title'>$name</span>
              <p class='sub-desc'>Lives in $location</p>
              <p class='desc'>$issue</p>
            </div>
          ";
        }
        ?>
      </div>
      <div class="add-user">
        <form action="" method="POST">
          <span class="heading">Add New User</span>
          <div id="fullname" class="input-field">
            <label>Fullname</label>
            <input name="fullname" type="text" maxlength="255" required />
          </div>
          <div id="email" class="input-field">
            <label>Email</label>
            <input name="email" type="email" maxlength="255" required />
          </div>
          <div id="age" class="input-field">
            <label>Age</label>
            <input name="age" type="text" maxlength="255" required />
          </div>
          <div id="occupation" class="input-field">
            <label>Occupation</label>
            <input name="occupation" type="text" maxlength="255" required />
          </div>
          <div id="location" class="input-field">
            <label>Location</label>
            <input name="location" type="text" maxlength="255" required />
          </div>
          <div id="issue" class="input-field">
            <label>Issue</label>
            <textarea name="issue" maxlength="255" placeholder="Explain your issue..." required></textarea>
          </div>
          <button>Add</button>
        </form>
      </div>
    </div>
  </div>
</body>

</html>