#include <stdint.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdio.h>
struct StudentStruct
{
	char fullName[50];
	char id[8];
	int streetNumber;
};
typedef struct StudentStruct Student;

void fillInformation(Student *a)
{
	gets(a->fullName);
	scanf("%s", a->id);
}

void showInfomation(Student *a)
{
	printf("\nStudent Name: %s , Student Id: %s , Street Number: %d", a->fullName, a->id , a->streetNumber);
}

void setStreetNumber(Student *a ,  int newStreetNumber){
	printf("\nStreet Number of Student %s is %d" , a->fullName , a->streetNumber);
	a->streetNumber = newStreetNumber;
}
int main()
{
	Student a;
	fillInformation(&a);
	int streetNumber = 14;
	//setStreetNumber(&a , streetNumber);
	//showInfomation(&a);
	streetNumber = 10;
	setStreetNumber(&a , streetNumber);
	showInfomation(&a);
	Student *b = &a;
	printf("\nAdress fullName variable of struct 'a' in memory is %d", &a.fullName);
	printf("\nAdress fullName variable of pointer b in memory %d", &b->fullName);
	printf("\nValue of a  : FullName Student a : %s , id Student a : %s , Street Number: %d", a.fullName, a.id , a.streetNumber);
	printf("\nValue of a as referenced by pointer b : FullName Student a : %s , id Student a : %s, Street Number: %d", b->fullName, b->id , b->streetNumber);
	// int *ptr = (int *)malloc(3 * sizeof(int));
	// int n = 3;
	// for (int i = 0; i < n; i++)
	//{
	//	scanf("%d", &ptr[i]);
	// }
	// for (int i = 0; i < n; i++)
	//{
	//	printf("arr[%d]:%d ", i, ptr[i]);
	// }
	return 0;
}
