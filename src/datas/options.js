import options from './defaultOptions';

let optionsByGroup;
sortOptionsByGroup();

export function getOptionsGroupName() {
  let groups = [];
  options.forEach((option) => {
    if (option.groups && option.groups.length > 0) {
      groups = groups.concat(option.groups);
    }
  });
  groups = arrayUnique(groups);
  return groups;
}

export function getOptionsByGroup() {
  if (!optionsByGroup) sortOptionsByGroup();
  return optionsByGroup;
}

export function getOptionById(id) {
  return options.find((option) => option.id === id);
}

function sortOptionsByGroup() {
  const groupsName = getOptionsGroupName();
  optionsByGroup = {};
  groupsName.forEach((name) => {
    optionsByGroup[name] = [];
  });
  options.forEach((option) => {
    if (option.groups && option.groups.length > 0) {
      option.groups.forEach((name) => {
        optionsByGroup[name].push(option);
      });
    }
  });
  console.log(optionsByGroup);
  return optionsByGroup;
}

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }
  return a;
}
