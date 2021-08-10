* Use the native web audio. We just need to adjust playback and crop the buffer (all should be easily possible).
* We can just pre-calculate the sounds for all bars and literally piece together the entire buffer before playing. Like a compile stage (I like that a lot)
* Then we just need to play/pause from react
* Finally we should actually load the audio files from a server. Duh we can't load from local file system
* Maybe use https://www.npmjs.com/package/react-audio-player
* Also something like https://stackoverflow.com/questions/14908838/loading-an-audio-buffer-and-play-it-using-the-audio-tag


# Adding tracks
## Preparation
* Website where you can upload a file
* Then you pick from the files (a drop down)
* It shows you if there is a bar track associated with file - if there is, it will play it back for you (easy enough to do)
* You can playback file and record a new bar track

## Processing
* Once recorded, it makes a call back to the server to cut up the file according to bars
* A Python script will break it up according to bars and name files
* It will also scale each bar to 1 second
* Given the name of the file, it will save a JSON file specifying how many bars there are, and each bar associated with it
* This is a mix between PHP and Python

## Arranging
* Specify track name. This will load the JSON file (using AJAX) and load up all of the individual bars using Tone.TrackBuffer
* Then, based on the "start" and "end" mapping, it will lay out all tracks into one giant Tone.TrackBuffer
* Then it will play that. Simple.
