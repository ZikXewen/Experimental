#include <math.h>
#include <stdio.h>
#include <stdlib.h>

int fund_interest[25];

void print_interest_rate(int month) {
  printf("In %d year %d month, the interest rate of fund is %d Percent\n",
         month / 12, month % 12, fund_interest[month / 3]);
}

double user_path() {
  int choice[25], month = 0, choice_count = 0;
  double money = 1000;

  while (month < 60) {
    printf("Time past : %d years %d months\n", month / 12, month % 12);
    printf("Current money = %.2f Majikite\n", money);
    printf("What do you want to choose next? (Input only choice NO.)\n");
    printf("1. Majikleen Fund (3-8 Percent) 3 months\n");
    printf("2. Bank (6 Percent) 6 months\n");
    printf("Choose : ");
    scanf("%d", &choice[choice_count++]);
    printf("\n");
    if (choice[choice_count - 1] == 1) {
      money *= (1 + 0.03 * fund_interest[month / 3]);
      month += 3;
      print_interest_rate(month - 3);
    } else {
      if (month >= 57) {
        printf("There's no time to invest in bank.\n");
        continue;
      }
      month += 6;
      money *= 1.36;
      print_interest_rate(month - 6);
      print_interest_rate(month - 3);
    }
  }
  printf("All history of your decision\n");
  int i;
  for (i = 0; i < choice_count; ++i)
    printf("Your decision [%d] is choice %d\n", i + 1, choice[i]);
  return money;
}

void print_final_money(double money) {
  const double money_types[11] = {1000, 500, 100, 50,  20,  10,
                                  5,    2,   1,   0.5, 0.25};
  const char money_types_str[11][5] = {"1000", "500", "100", "50",  "20",  "10",
                                       "5",    "2",   "1",   "0.5", "0.25"};
  printf("\nFinal Money : %.2f Majikite\n", money);
  int i;
  for (i = 0; i < 11; ++i) {
    if (money >= money_types[i]) {
      int count = floor(money / money_types[i]);
      printf("%s Majikite x%.0f\n", money_types_str[i], count);
      money -= (count * money_types[i]);
    }
  }

  printf("\n");
}

void best_path() {
  int choice_count = 0, chose_bank[25], choice[25];
  double money[25];
  money[0] = 1000;
  int i = 0;
  for (int i = 1; i <= 20; ++i) money[i] = 0;
  for (i = 0; i < 20; ++i) {
    double money_if_fund = money[i] * (1 + fund_interest[i] * 0.03);
    double money_if_bank = money[i] * 1.36;
    if (money_if_fund > money[i + 1]) {
      money[i + 1] = money_if_fund;
      chose_bank[i + 1] = 0;
    }
    if (money_if_bank > money[i + 2]) {
      money[i + 2] = money_if_bank;
      chose_bank[i + 2] = 1;
    }
  }
  for (int i = 20; i > 0;) {
    if (chose_bank[i])
      choice[i -= 2] = 1;
    else
      choice[--i] = 0;
  }
  for (int i = 0; i < 20;) {
    printf("%d year %d month: %.2f => ", i / 4, (i * 3) % 12, money[i]);
    if (choice[i]) {
      printf("Bank\n");
      i += 2;
    } else {
      printf("Fund\n");
      i++;
    }
  }
  printf("5 year 0 month: %.2f", money[20]);
}

int main() {
  printf("Initial money = 1,000.00 Majikite\n");
  int i;
  for (i = 0; i < 20; ++i) fund_interest[i] = (rand() % 6) + 3;
  double money = user_path();
  print_final_money(money);
  best_path();
  return 0;
}