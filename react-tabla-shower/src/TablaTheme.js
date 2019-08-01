import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class TablaTheme extends Component {
  constructor (props) {
    super(props);


    this.state = {
      theme: this.props.theme,
      barIndex: [],
      noteIndex: []
    }
  }

  componentWillMount () {
    this.installTheme(this.props.theme);
  }

  splitIntoNotes (bar) {
    var notes = [];
    var currentNote = '';

    var newNote = (chr) => chr.toUpperCase() == chr || chr == '-';

    for (var i = 0; i < bar.length; i++) {
      var chr = bar[i];
      if (newNote(chr)) {
        if (currentNote != '') notes.push(currentNote);
        currentNote = chr;
      } else {
        currentNote = currentNote + chr;
      }
    }

    // Reached the end
    if (currentNote != '') notes.push(currentNote);
    return notes;
  }

  installTheme (themeLines) {
    // Take each line
    var allLines = themeLines.join(' ');
    var bars = allLines.split(' ');
    var barIndex = {};
    var noteIndex = {};
    for (var i = 0; i < bars.length; i++) {
      barIndex[i+1] = bars[i];
      var notes = this.splitIntoNotes(bars[i]);
      for (var n = 0; n < notes.length; n++) {
        var chr = String.fromCharCode(97 + n);
        var noteKey = '' + (i+1) + chr;
        noteIndex[noteKey] = notes[n];
      }
    }

    for (var b_idx in barIndex) {
      console.log(b_idx + " => " + barIndex[b_idx]);
    }

    for (var n_idx in noteIndex) {
      console.log(n_idx + " => " + noteIndex[n_idx]);
    }


    this.setState({
      barIndex: barIndex,
      noteIndex: noteIndex
    })
  }

  drawTheme () {
    var barsPerLine = 4;

    // Assert there are even number of bars


    if (Object.keys(this.state.barIndex).length % barsPerLine != 0) {
      console.log('Error. Bars must be a multiple of 4.');
      return;
    }

    var lines = [];
    var main_bar_idx = 1;
    for (var line_idx = 0; line_idx < this.state.theme.length; line_idx++) {
      var bars = [];
      for (var bar_idx = 0; bar_idx < barsPerLine; bar_idx++) {
        bars.push((
          <td>{ this.state.barIndex[main_bar_idx] }</td>
        ));
        main_bar_idx++;
      }

      lines.push((
          <tr>{ bars }</tr>
      ));
    }

    return (
      <table>{ lines } </table>
    );


  }

  render () {
    return (
      <div className="theme">{
        this.drawTheme()
      }</div>
    );
  }
}
