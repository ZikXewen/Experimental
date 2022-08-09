#include <iostream>
#include <string>
using namespace std;

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);
  std::string inp;
  cin >> inp;
  const int k = inp.find_first_not_of('0');
  if (k == -1) {
    cout << "0 is PALINDROME";
    return 0;
  }
  inp = inp.substr(k);
  for (int i = 0, j = inp.length() - 1; i < j; ++i, --j)
    if (inp[i] != inp[j]) {
      cout << inp << " is NOT PALINDROME";
      return 0;
    }
  cout << inp << " is PALINDROME";
}