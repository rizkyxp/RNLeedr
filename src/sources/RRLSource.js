
export async function fetchHtmlSource(url) {
  console.log("time to fetch");
  let body;
  try {
    const response = await fetch(url);
    body = response['_bodyInit'];
    //console.log(body);
  } catch (err) {
    console.log('fetch failed', err);
  } 
  return body;
}

export function parseChapterInfos(doc) {
  console.log("getting chapters");
  //RRL has a table with the id 'chapters'. We are looking for the chapter links which are in the <tbody>
  //Each row of the <tbody> is represented by <tr>
  var rows = doc.querySelector('#chapters').querySelector('tbody').querySelectorAll('tr')
  var info = rows.map(function(row) {
    //This gets date published, which might be used later
    date = row.querySelector('time').text; 
    title = row.querySelector('a').removeWhitespace().text;
    //The first <a> of each row contains the chapter link (without the base url)
    link = 'https://royalroadl.com' + row.querySelector('a').attributes['href'];
    return {"date":date, "title":title, "url":link};
  })

  //console.log(info);
  return info
}

export function parseFictionInfo(doc) {
  //Maybe include fiction tags?
  var info = {};
  info['title'] = doc.querySelector('h1').text;
  info['author'] = doc.querySelector('h4').querySelector('a').text;
  info['desc'] = doc.querySelector('.hidden-content').structuredText;
  info['img'] = doc.querySelector('.fic-header').querySelector('img').rawAttributes['src'];
  //Title + author and remove any non-alphanumeric, remove spaces, then lowercase
  info['key'] = ('rr' + info['title'] + info['author']).replace(/[^\w\s]|_/g, "").replace(/\s+/g, '').toLowerCase();;
  //console.log(info);

  var chapterInfos = parseChapterInfos(doc);
  return {fictionInfo:info, chapterInfos:chapterInfos};
}

export function parseChapterContent(doc) {
  let finalContent = "";
  let arr = doc.querySelector('.chapter-content')['childNodes'];

  for(i = 0; i < arr.length; i++) {
    let node = arr[i];
    if (node.tagName === 'br') {
      finalContent += '\n';
    } else {
      finalContent += node.text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');;
    }
  }

  return finalContent;
}