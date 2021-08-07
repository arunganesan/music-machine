* Use the native web audio. We just need to adjust playback and crop the buffer (all should be easily possible).
* We can just pre-calculate the sounds for all bars and literally piece together the entire buffer before playing. Like a compile stage (I like that a lot)
* Then we just need to play/pause from react
* Finally we should actually load the audio files from a server. Duh we can't load from local file system
* Maybe use https://www.npmjs.com/package/react-audio-player
* Also something like https://stackoverflow.com/questions/14908838/loading-an-audio-buffer-and-play-it-using-the-audio-tag
