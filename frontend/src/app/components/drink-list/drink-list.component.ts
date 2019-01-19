import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Drink} from '../../api/drink';
import {AuthService} from '../../service/auth.service';
import {DrinkFormComponent} from '../drink-form/drink-form.component';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Location} from '../../api/location';
import {LocationService} from '../../service/location.service';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})
export class DrinkListComponent implements OnInit {

  drinks: Array<Drink>;
  drinksWithLocations: Map<Drink, Location> = new Map<Drink, Location>();
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  constructor(private drinkFormComponent: DrinkFormComponent, private authService: AuthService, private drinkService: DrinkService,
              private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService,
              private locationService: LocationService) {
    this.loadData();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data.drinks) {
      this.drinks = data.drinks;
      this.drinks.forEach((value, index) => {
        this.locationService.getById(String(value.locationID)).subscribe((val: any) => {
          this.drinksWithLocations.set(this.drinks[index], val);
        });
      });
    }
  }

  navigateToDrinkForm(id: number) {
    this.router.navigate(['/drink-form/' + id]);
  }

  deleteDrink(drink: Drink) {
    this.drinkService.delete(drink.id)
      .subscribe(() => {
        this.toastr.success('Drink: ' + drink.name + ' has been successfully deleted!', 'Sucess!:');
        this.refetchData();
      });
  }

  refetchData() {
    this.drinkService.getAll().subscribe((response: any) => {
      this.drinks = response;
    });
  }

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }
}

