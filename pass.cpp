#include <iomanip>
#include <iostream>
#include <regex>
#include <string>
using namespace std;

int main() {
  string str;
  cin >> str;
  const regex pat = regex("\\d+");
  int sum = 0;
  for (auto i = sregex_iterator(str.begin(), str.end(), pat);
       i != sregex_iterator(); ++i)
    sum += stoi(i->str());
  cout << setfill('0') << setw(4) << sum;
}