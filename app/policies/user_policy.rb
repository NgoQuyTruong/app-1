class UserPolicy < ApplicationPolicy
    attr_reader :user, :scope

    def initialize user, scope
        @user = user
        @scope = scope
    end

    class Scope < Scope
        def resolve
            if user.role == "super_admin"
               scope.all
            else
                scope.where(user_id: user.id)
            end
        end
    end

    def edit?
        scope.id == user.id  || user.role == "super_admin"
    end

    def update?
        scope.id == user.id || user.role == "super_admin"
    end

    def destroy?
        scope.user_id == user.id || user.role == "super_admin"
    end

    def show?
        scope.user_id == user.id  || user.role == "super_admin" 
    end
end