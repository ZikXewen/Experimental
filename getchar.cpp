#include <stdio.h>

#include <iostream>
#include <string>

int main() {
  std::string str;
  std::getline(std::cin, str);
  char c = str[0];
  std::getline(std::cin, str);
  std::cout << c << ' ' << str;
  return (0);
}