"use strict";

const logout = new LogoutButton();

logout.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
        location.reload();
        }
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const board = new RatesBoard();

const stocks = ApiConnector.getStocks(response => {
    if (response.success) {
        board.clearTable();
        board.fillTable(response.data);
    }
});

setInterval(stocks, 60000);

const money = new MoneyManager();

money.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Пополнение баланса выполнено успешно!');
        } else {
            money.setMessage(false, response.error);
        }
    });
}

money.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Конвертация валюты выполнена успешно!');
        } else {
            money.setMessage(false, response.error);
        }
    });
}

money.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Перевод валюты выполнен успешно!');
        } else {
            money.setMessage(false, response.error);
        }
    });
}

const fav = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        fav.clearTable();
        fav.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});

fav.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            fav.clearTable();
            fav.fillTable(response.data);
            money.updateUsersList(response.data);
            fav.setMessage(true, 'Пользователь добавлен в список избранных!');
        } else {
            fav.setMessage(false, response.error);
        }
    });
}

fav.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            fav.clearTable();
            fav.fillTable(response.data);
            money.updateUsersList(response.data);
            fav.setMessage(true, 'Пользователь удален из списка избранных!');
        } else {
            fav.setMessage(false, response.error);
        }
    });
}