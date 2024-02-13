class GroceryItem {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  }
  describe() {
    return `${this.name} is in this ${this.category} section of the store.`;
  }
}
// This is a "Blue print of a Grocery Item" and where it would be in the store.
//I did it by name and the section it was in

// This is a blue print of a grocery list to made and labeled by what day it is.
//My thought was creating shopping list for daily items, and telling the shopper some direction
class GroceryList {
  constructor(name) {
    this.name = name;
    this.groceryItems = [];
  }

  addGroceryItem(groceryItem) {
    if (groceryItem instanceof GroceryItem) {
      this.groceryItems.push(groceryItem);
    } else {
      throw new Error(
        `You can only add a Grocery Item, Sorry try again :${groceryItem}`
      );
    }
  }

  describe() {
    return `${this.name} has ${this.groceryItems.length} grocery items on the list.`;
  }
}

// The Biggest gear of this clock is the Main menu and what the user prompts, the promp will then go into the selection switch and choose what case to call

// after it knows what case in the switch the user chose, that function needs to call on itself to find out the input needed.
class Menu {
  constructor() {
    this.groceryLists = [];
    this.selectedGroceryList = null;
  }

  start() {
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createGroceryList();
          break;
        case "2":
          this.viewGroceryList();
          break;
        case "3":
          this.deleteGroceryList();
          break;
        case "4":
          this.displayGroceryLists();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Have a RAD day!");
  }
  // shown to user when 1st looking at UI, the prompt notifies the switch was func to call
  showMainMenuOptions() {
    return prompt(`
    0) Exit
    1) Create a New Grocery list
    2) View Grocery List
    3) Delete Grocery List
    4) Display all Grocery Lists
    `);
  }
  // This menu is a submenu in the 2 view grocery list prompt, this is how a user would add items to the day lists
  showGroceryListMenuOptions(groceryListInfo) {
    return prompt(`
    0 Back
    1 Create New Grocery Item
    2 Delete Grocery Item
    ---------
    ${groceryListInfo}`);
  }
  // Showing the what grocery list is determined by the prompt the user gives when the choose to view grocery lists, the loop runs through anything more than -
  displayGroceryLists() {
    let groceryListString = " ";
    for (let i = 0; i < this.groceryLists.length; i++) {
      groceryListString += i + " ) " + this.groceryLists[i].name + "\n";
    }
    alert(groceryListString);
  }
  createGroceryList() {
    let name = prompt(`New Day, New List- What day is it?`);
    this.groceryLists.push(new GroceryList(name));
  }
  // this was my trickiest spot when trying to get everything to work. I kept mixing up the wrong names and getting whacky results.
  viewGroceryList() {
    let index = prompt(`Enter Grocery List ID number to view List:`);
    if (index > -1 && index < this.groceryLists.length) {
      this.selectedGroceryList = this.groceryLists[index];
      let description = "Grocery List: " + this.selectedGroceryList.name + "\n";
      description += " " + this.selectedGroceryList.describe();
      +"\n";
      for (let i = 0; i < this.selectedGroceryList.groceryItems.length; i++) {
        description +=
          i +
          " ) " +
          this.selectedGroceryList.groceryItems[i].describe() +
          "\n";
      }

      let selection3 = this.showGroceryListMenuOptions(description);
      switch (selection3) {
        case "1":
          this.createGroceryItem();
          break;
        case "2":
          this.deleteGroceryItem();
      }
    }
  }
  // Have the variable prompt from the user and if it is greater than -1 and not greater than the length of the list. It will  run the code to remove the prompt index
  deleteGroceryList() {
    let index = prompt(`Select a number for Grocery List ID to delete:`);
    if (index > -1 && index < this.groceryLists.length) {
      this.groceryLists.splice(index, 1);
    }
  }
  // This function calls for 2 variables to be prompted by the user and that will create the grocery item to be added to the list of grocery list.
  createGroceryItem() {
    let name = prompt(`Enter Name of a New Grocery Item:`);
    let category = prompt(
      `What section of the store is it in? Dairy, Produce, Bakery, Deli, Aisle Description`
    );
    this.selectedGroceryList.addGroceryItem(new GroceryItem(name, category));
  }
  // Deleting took me a sec to figure out what list was being removed, after much tetius line and character searching, I finally found the matches to make it happen!
  deleteGroceryItem() {
    let index = prompt(`Select ID # of Grocery Item to delete:`);
    if (index > -1 && index < this.selectedGroceryList.groceryItems.length) {
      this.selectedGroceryList.groceryItems.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
