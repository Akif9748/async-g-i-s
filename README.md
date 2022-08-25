# async-g-i-s

Async altarnative for g-i-s

## Installation

`npm i async-g-i-s`

## Async/await Usage
```js
const gis = require('async-g-i-s');

(async () => {
  try {

    const results = await gis("akif");
    console.log(results.slice(0, 10));

  } catch (e) {
    console.error(e);
  }
})();
```
## .then() Usage
```js
const gis = require('async-g-i-s');

gis("akif").then(console.log).catch(console.error);
```


Output:
```js
[
  {
    url: 'https://m.media-amazon.com/images/M/MV5BMWQwM2M4NDMtOTI3Ni00NTMyLWI4YzktYTNkMjcyYmYzNzY4XkEyXkFqcGdeQXVyMTMyMTYxODIy._V1_.jpg',        
    height: 1477,
    width: 1034
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Mehmet_%C3%82kif_Ersoy.png',
    height: 1908,
    width: 1656
  },
  {
    url: 'https://m.media-amazon.com/images/M/MV5BNzNlNGQ0NDUtODE4Yy00OTNjLTkyYWYtZTJmNTQ4MDU4ODA4XkEyXkFqcGdeQXVyNTA0MDE0NjQ@._V1_.jpg',        
    height: 2048,
    width: 1434
  },
  {
    url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2020/12/20/thumbs_b_c_ef4c27d49cbd1cfe2311ff4bc582514e.jpg',
    height: 486,
    width: 864
  },
  {
    url: 'https://img.kitapyurdu.com/v1/getImage/fn:11498652/wh:true/wi:800',
    height: 1345,
    width: 800
  },
  {
    url: 'https://i4.hurimg.com/i/hurriyet/75/1200x675/5aa587a218c77324cc5456b5.jpg',
    height: 675,
    width: 1200
  },
  {
    url: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/10/17/thumbs_b_c_26c09ac1a20d0b12916c49936728eb22.jpg?v\\u003d124950',
    height: 486,
    width: 864
  },
  {
    url: 'https://i.dha.com.tr/i/dha/75/0x0/6245a965470a9b4a8c336615.jpg',
    height: 450,
    width: 800
  },
  {
    url: 'https://media-cdn.t24.com.tr/media/library/2021/09/1632461524964-thumbs-b-c-65-cf-0-ecf-0-d-4-c-3-d-9-e-9-d-2-e-56-a-3352-ac-244.jpg', 
    height: 486,
    width: 864
  },
  {
    url: 'https://img.piri.net/resim/imagecrop/2021/12/27/10/41/resized_0c8d4-430d41adakif.jpg',
    height: 1959,
    width: 1832
  }
]
```

You can add extra queries to URL:
```js
  gis("akif",{safe:"on"});

```
Example, this will not fetch NSFW results. 

You can also filter out results from specfied.
```js
  gis("akif", {}, [ 'm.media-amazon.com' ]);

```
 