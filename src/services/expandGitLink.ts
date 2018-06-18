export default function (repo) {
  var repoLink = '';
  var credentials = false;
  var username = '';
  var password = false;
  var host = 'github.com';
  var hostRepo = '';

  // Add Protocol
  if (repo.indexOf('://') === -1) {
    repoLink += 'https://';
  }

  // Get Credentials
  if (repo.indexOf('@') >= 0) {
    var repoArr = repo.split('@');
    credentials = repoArr[0];
    hostRepo = repoArr[1].split('/').slice(1).join('/');
    if (repoArr[1].split('/')[0].indexOf('.') >= 0) {
      host = repoArr[1].split('/')[0];
    }
  } else {
    var repoArr = repo.split('/');
    if (repoArr[0].indexOf('.') >= 0) {
      host = repoArr[0];
      hostRepo = repoArr.slice(1).join('/');;
    } else {
      hostRepo = repo;
    }
  }

  // Return Full HTTP Link
  return repoLink += `${credentials ? credentials + '@' : ''}${host}/${hostRepo.indexOf('.git') >= 0 ? hostRepo : hostRepo + '.git'}`;
};