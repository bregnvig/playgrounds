module playgrounds.feature.map {

  export interface IFilterText {
    value: string;
  }

  angular.module('playgrounds')
    .value('filterText', {
      value: ''
    });
}
