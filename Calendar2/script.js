<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Calendar</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 class="text-center mt-5">Music Calendar</h1>
        <div class="calendar">
            <!-- Generate calendar days here with Bootstrap grid -->
            <!-- You can use PHP, JavaScript, or any other server-side language to generate these dynamically -->
            <!-- For simplicity, let's manually create some calendar days -->
            <div class="calendar-day">
                <img src="music1.jpg" alt="Music 1" class="music-img">
                <div class="music-details">
                    <h3>Music 1</h3>
                    <p>Artist: Artist 1</p>
                    <button class="btn btn-primary play-button">Play</button>
                </div>
            </div>
            <!-- Repeat this structure for each day -->
            <div class="calendar-day">
                <img src="music2.jpg" alt="Music 2" class="music-img">
                <div class="music-details">
                    <h3>Music 2</h3>
                    <p>Artist: Artist 2</p>
                    <button class="btn btn-primary play-button">Play</button>
                </div>
            </div>
            <!-- ... Repeat for other days ... -->
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
