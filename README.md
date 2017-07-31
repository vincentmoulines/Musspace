# Musspace
There are 3 kind of users: musicians, producer and average user.
the musicians can share their own song with other people on the site. The user have access to every song and can upvote or downvote any song.
the producer have access to the daily billboard and if one song on the top touch his soul he could get in touch with the musicians.
the musicians can chat with other musicians or with users.
The producer can chat with musicians but not with average user.
the user can chat with each other.

the daily billboard is sorted by genre ( rock, pop, electro, hip hop,...)
the song is described by its name, length, author and genre


# Architecture
Front-end:
Signup page
Login page
User Dashboard (main user page) - his projects, options, billboard etc.
Embedded music player
"Daily billboard"
Chat

Back-end:
MongoDB database to hold user info, voting stats, song urls
Models - User, Song




# Possible APIs to use
Embedded audio such as:
https://developers.soundcloud.com/docs/api/guide

Some chat api?
https://www.pubnub.com/

Some voting api?
https://www.drupal.org/project/votingapi
