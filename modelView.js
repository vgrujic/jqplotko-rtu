(function MyViewModel($) {

  var self = this;
  self.logItems = [];
  var itemArray = [new Item({name: 'Education', val: 42}), new Item({name: 'Bills', val: 21}), new Item({name: 'Hobies', val: 15}), new Item({name: 'Entertainment', val: 10}), new Item({name: 'Groceries', val: 7}), new Item({name: 'Savings', val: 3}), new Item({name: 'Insurance', val: 2})];
  self.items = ko.observableArray(itemArray);

  
  self.totalExpensesAllocation = ko.computed(function() {
    var sum = 0;
    for (var i = 0; i < self.items().length; i++) {
      var item = self.items()[i];
      sum += item.val();
    }
    return sum;
  });
  var expensesAllocationPieData = function(items) {
    var dataArr = [[]];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      dataArr[0].push([item.name, item.val()]);
    }
    return dataArr;
  }
  self.testRTU = function() {
    var randomVal = Math.floor(Math.random() * 100);
    self.items.push(new Item({name: 'Comodity '+ randomVal, val: randomVal}));
  }
  var dataIntervalID = null;
  var updateData = function() {
    var dataArray = self.items();
    var randomIndex = Math.floor(Math.random() * dataArray.length);
    var randomVal = Math.floor(Math.random() * 10);
    randomVal = randomVal < 0 ? 0 : randomVal;
    dataArray[randomIndex].val( dataArray[randomIndex].val() + randomVal);
  }
  self.startRTU = function() {
    dataIntervalID = window.setInterval(updateData, 1000);
  }
  self.stopRTU = function() {
    if ( dataIntervalID != null ) window.clearInterval(dataIntervalID);
  }
 
    self.removeItem = function(item) {
        self.items.remove(item);
    };

    ko.bindingHandlers.pieChart = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever the associated observable changes value.
            // Update the DOM element based on the supplied values here.

            var value = valueAccessor();
 
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.unwrap(value);
   			var items = valueUnwrapped; 

            pieChart.series[0].data = expensesAllocationPieData(items)[0];
            pieChart.replot();
        }
    };

    // Pie chart
    var pieChart = $.jqplot('resultsChart', expensesAllocationPieData(self.items()), {
        title: 'Expenses Allocation',
        seriesDefaults: {
        // Make this a pie chart.
        renderer: $.jqplot.PieRenderer, 
        rendererOptions: {
          // Put data labels on the pie slices.
          // By default, labels show the percentage of the slice.
          showDataLabels: true
        }
      }, 
      legend: { show:true, location: 'e' }
    });

  function Item(anItem) {
    var self = this;
    self.name = anItem.name;
    self.val = ko.observable(anItem.val);
  }

  ko.applyBindings(self);


})(jQuery);
