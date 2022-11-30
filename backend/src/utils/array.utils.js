Array.prototype.findAll = function (predicate) {
  var found = new Array();
  this.forEach(function (current) {
    if (predicate(current)) {
      found.push(current);
    }
  });

  return found;
};
