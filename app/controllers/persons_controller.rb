class PersonsController < ApplicationController
  def index
    @persons = Person.all
  end

  def create
    @person = Person.new(person_params)
    @person.save

    redirect_to '/persons'
  end

  private
  def person_params
    params.require(:person).permit(:name, :email, :phone_number)
  end
end
