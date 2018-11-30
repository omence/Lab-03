'use strict';

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  keyArr.push(this.keyword);
}

Horn.allHorns = [];
console.log(Horn.allHorns);
let keyArr = [];
console.log(keyArr);

Horn.prototype.render = function() {
  const $template = $('#hornsTem').html();
  const $source = Handlebars.compile($template);
  return $source(this);
};




let selectRend = () => {
  keyArr.forEach( element => {
    $('select').append('<option class="optClone"></option>');
    console.log(element);
    let optionClone = $('option[class="optClone"]');
    optionClone.text(element);
    optionClone.removeClass('optClone');
  });
};
//var page = 'data/page-1.json';


Horn.readJson = (page) => {
  $.get(page, 'json')
    .then(data => {
      data.forEach(obj => {
        Horn.allHorns.push(new Horn(obj));
      });
    })
    .then(Horn.loadHorns).then(selectRend);
};

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => {
    $('#photo-template').append(horn.render());
  });
};

$(() => Horn.readJson('data/page-1.json'));

$('select').on('change',selShow);
function selShow(){
  let selItem=$(this).val();
  $('div').show();
  if(selItem!==''){
    $('div').not('[class*="'+selItem+'"]').hide();
  }
}

$('#pg2').click(function(){
  $('div').remove();
  $('option').remove();
  Horn.allHorns = [];
  keyArr = [];
  $(() => Horn.readJson('data/page-2.json'));
});

$('#pg1').click(function(){
  $('div').remove();
  $('option').remove();
  Horn.allHorns = [];
  keyArr = [];
  $(() => Horn.readJson('data/page-1.json'));
});

// $('#titleBut').click(function(){
//  Horn.allHorns.sort();
 
// });